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
const event = eventResponse.data.value;

const participates = computed(() =>
  event.participants.includes(user?.value?.id || -1),
);
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
      class="w-fit h-fit px-5 py-2 bg-accent-red text-text-gray/85 border border-text-gray/85 rounded-xl text-sm font-bold cursor-pointer"
    >
      <span v-if="">Вы участвуете</span>
    </button>
    <button
      class="flex justify-center items-center p-2 rounded-xl bg-transparent border border-text-gray cursor-pointer"
    >
      <Icon
        name="material-symbols:calendar-add-on-outline-rounded"
        size="19px"
        class="w-[19px] h-[19px]"
      />
    </button>
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
