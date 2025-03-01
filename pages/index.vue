<script setup lang="ts">
import type {
  GetFutureEventsResponse,
  GroupedEvents,
} from "~/server/models/events_routes";

definePageMeta({
  middleware: ["authenticated"],
});

const now = ref(new Date());

const { data: events, error } =
  await useFetch<GetFutureEventsResponse>("/api/events");
const eventsData = error.value ? {} : (events.value as GetFutureEventsResponse);

const todayEvents = computed(() => {
  const month = now.value
    .toLocaleString("ru", { month: "short" })
    .toUpperCase()
    .slice(0, 3);

  const currentMonthEvents = eventsData[month as keyof GroupedEvents] || {};
  const currentDay = now.value.getDate();

  return currentMonthEvents[currentDay] || [];
});

console.log(todayEvents.value);

const eventColors = ["#BBE19E", "#FDE1AB", "#F4B0C0"];

onMounted(() => {
  const timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
  onBeforeUnmount(() => clearInterval(timer));
});
</script>

<template>
  <div class="w-full px-6 flex flex-row flex-wrap items-center gap-2">
    <button
      class="px-5 py-2 text-sm font-semibold border border-text-gray rounded-[20px] cursor-pointer bg-text-gray text-white"
    >
      Сегодня
    </button>
    <button
      class="px-5 py-2 text-sm font-semibold border border-text-gray rounded-[20px] cursor-pointer"
      @click="navigateTo('/calendar')"
    >
      Календарь
    </button>
  </div>
  <div class="ml-6 mt-5 text-text-gray/85 text-base font-semibold capitalize">
    <span>{{ now.toLocaleString("ru", { weekday: "long" }) }}</span>
  </div>
  <div
    class="w-full px-6 flex flex-row justify-between items-center text-[64px]/16 font-semibold"
  >
    <div class="flex flex-col">
      <span class="text-text-gray/85">
        {{ now.toLocaleDateString("ru", { day: "2-digit", month: "2-digit" }) }}
      </span>
      <span class="text-text-gray/85">
        {{
          now.toLocaleString("ru", { month: "short" }).slice(0, 3).toUpperCase()
        }}
      </span>
    </div>
    <div class="w-[2px] h-[96px] bg-text-gray/85"></div>
    <div class="flex flex-col items-center">
      <span class="text-text-gray/85">
        {{ now.getHours().toString().padStart(2, "0") }}
      </span>
      <span class="text-text-gray/85">
        {{ now.getMinutes().toString().padStart(2, "0") }}
      </span>
    </div>
  </div>
  <section
    class="grow w-full mt-4 bg-white rounded-t-[35px] p-6 flex flex-col gap-2"
  >
    <span class="text-text-gray text-xl font-bold mb-2">
      Мероприятия сегодня
    </span>
    <TodayEventCard
      v-for="(event, index) in todayEvents"
      :key="event.id"
      :id="event.id"
      :title="event.title"
      :description="event.description"
      :start-date="new Date(event.start)"
      :end-date="new Date(event.end)"
      :likes="event.likes.length"
      :color="eventColors[index % eventColors.length]"
    />
    <div v-if="!todayEvents.length" class="text-center py-4 text-text-gray/70">
      Нет мероприятий на сегодня
    </div>
  </section>
</template>

<style scoped></style>
