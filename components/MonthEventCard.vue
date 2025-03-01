<template>
  <div
    :class="[
      color,
      'flex flex-col justify-center p-3 m-3 mx-5 h-36 rounded-2xl relative z-10',
    ]"
  >
    <p class="opacity-50 font-bold text-xl">
      {{ getDayOfWeek(dayNumber, month) }}
    </p>
    <h1 class="text-5xl opacity-50 font-semibold">{{ props.dayNumber }}</h1>
    <h2 class="text-4xl opacity-50 font-semibold">{{ props.month }}</h2>
    <div
      class="absolute top-3 right-3 flex flex-col truncate max-w-3/4 items-end gap-1"
    >
      <div
        class="flex items-center h-6 gap-1"
        v-for="(event, index) in props.events"
        :key="index"
      >
        <div class="bg-black opacity-50 rounded-full px-3">
          <p :class="[textColor, 'font-bold']">{{ event.title }}</p>
        </div>
        <p class="opacity-50 font-bold">{{ formatTime(event.start) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { months } from "~/server/models/events_routes";

export interface IEvent {
  title: string;
  start: string;
}

export interface IMonthEventCard {
  dayNumber: number;
  colorNumber: 1 | 2 | 3;
  events: IEvent[];
}

const color = computed(() => {
  switch (props.colorNumber) {
    case 1:
      return "bg-accent-pink";
    case 2:
      return "bg-accent-yellow";
    case 3:
      return "bg-accent-green";
  }
});

const getDayOfWeek = (day: number, month: any): string => {
  const date = new Date(new Date().getFullYear(), months.indexOf(month), day);
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return days[date.getDay()];
};

const textColor = computed(() => {
  switch (props.colorNumber) {
    case 1:
      return "text-accent-pink";
    case 2:
      return "text-accent-yellow";
    case 3:
      return "text-accent-green";
  }
});

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getWeekDay(
  date: Date,
  locale: string | string[] = "ru-RU",
  weekdayFormat: "long" | "short" | "narrow" = "long",
): string {
  return date.toLocaleDateString(locale, { weekday: weekdayFormat });
}

const props = defineProps<IMonthEventCard & { month: string }>();
</script>

<style></style>
