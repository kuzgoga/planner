<script setup lang="ts">
import type { GetEventByIdResponse } from "~/server/models/events_routes";

definePageMeta({
  middleware: ["authenticated"],
});

const { user } = useUserSession();

const id = parseInt(useRoute().params.id as string);

const eventResponse = await useFetch<GetEventByIdResponse>("/api/event/" + id);
if (!eventResponse.data.value) {
  throw createError({ statusCode: 404, statusMessage: "Event not found" });
}
const event = ref(eventResponse.data.value);

const participates = computed(() =>
  event.value.participants.some((p) => p.id === user?.value?.id),
);

const handleParticipation = async () => {
  if (!user.value) return;
  console.log(participates.value);

  if (participates.value) {
    try {
      await $fetch("/api/event/leave/" + id, {
        method: "POST",
      });
      event.value.participants = event.value.participants.filter(
        (p) => p.id !== user.value?.id,
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await $fetch("/api/event/join/" + id, {
        method: "POST",
      });
      event.value.participants.push(user.value);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<template>
  <nuxt-img
    :src="event.preview_path"
    alt="Event Image"
    class="mx-6 rounded-[25px] object-fill aspect-video"
  />
  <div class="flex flex-row mt-4 justify-between items-center mx-6">
    <span class="text-2xl font-bold grow break-words">{{ event.title }}</span>
    <div class="w-fit flex flex-row items-center">
      <span class="text-sm font-semibold">{{ event.participants.length }}</span>
      <Icon
        name="material-symbols:group-outline-rounded"
        class="w-[22px] h-[22px] ml-[2px]"
      />
      <span class="text-sm font-semibold ml-4">{{ event.likes.length }}</span>
      <Icon
        name="material-symbols:favorite-outline-rounded"
        class="w-[22px] h-[22px] ml-[2px]"
      />
    </div>
  </div>
  <div class="mx-4 mt-4 flex flex-row justify-between">
    <button
      class="w-fit h-fit px-5 py-2 text-text-gray/85 border border-text-gray/85 rounded-xl text-sm font-bold cursor-pointer"
      :class="{ 'bg-accent-red': !participates }"
      @click="handleParticipation"
    >
      <span v-if="participates">Вы участвуете</span>
      <span v-else-if="user?.role === 'ORGANIZER'">
        Участвовать в организации
      </span>
      <span v-else>Принять участие</span>
    </button>
    <a
      download
      :href="`/api/event/export/${event.id}`"
      class="flex justify-center items-center p-2 rounded-xl bg-transparent border border-text-gray cursor-pointer"
    >
      <Icon
        name="material-symbols:calendar-add-on-outline-rounded"
        size="19px"
        class="w-[19px] h-[19px]"
      />
    </a>
  </div>
  <div
    class="mt-4 w-full grow flex flex-col gap-2 p-6 bg-white rounded-t-[35px]"
  >
    <span class="text-xl font-bold">О мероприятии</span>
    <span class="text-sm font-semibold w-full break-words">{{
      event.description
    }}</span>
    <span class="mt-2 text-xl font-bold">Сроки проведения</span>
    <span class="text-sm font-semibold w-full break-words">
      {{ new Date(event.start).toLocaleDateString("ru") }} -
      {{ new Date(event.end).toLocaleDateString("ru") }}
    </span>
    <span class="mt-2 text-xl font-bold">Место проведения</span>
    <span class="text-sm font-semibold w-full break-words">
      {{ event.location }}
    </span>
  </div>
</template>
