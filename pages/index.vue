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
  const month = now.value.toLocaleString("ru", { month: "short" });

  const currentMonthEvents = eventsData[month as keyof GroupedEvents] || {};
  const currentDay = now.value.getDate();

  return currentMonthEvents[currentDay] || [];
});

console.log(todayEvents.value);

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
      :id="1"
      title="Арт-весна"
      description="Задача организации, в особенности же начало повседневной работы по формированию позиции требуют от нас анализа форм развития. Таким образом новая модель организационной деятельности позволяет  выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач."
      :start-date="new Date('2025-02-28T14:00:00')"
      :end-date="new Date('2025-02-28T16:00:00')"
      :likes="932"
      color="#BBE19E"
    />
    <TodayEventCard
      :id="2"
      title="Арт-весна"
      description="Задача организации, в особенности же начало повседневной работы по формированию позиции требуют от нас анализа форм развития. Таким образом новая модель организационной деятельности позволяет  выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач."
      :start-date="new Date('2025-02-28T14:00:00')"
      :end-date="new Date('2025-02-28T16:00:00')"
      :likes="932"
      color="#FDE1AB"
    />
    <TodayEventCard
      :id="3"
      title="Арт-весна"
      description="Задача организации, в особенности же начало повседневной работы по формированию позиции требуют от нас анализа форм развития. Таким образом новая модель организационной деятельности позволяет  выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач."
      :start-date="new Date('2025-02-28T14:00:00')"
      :end-date="new Date('2025-02-28T16:00:00')"
      :likes="932"
      color="#F4B0C0"
    />
  </section>
</template>

<style scoped></style>
