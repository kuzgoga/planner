<script setup lang="ts">
defineProps<{
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  likes: number;
  color: string;
}>();

/**
 * Formats the duration between two dates in Russian language format.
 * @param {Date} start - The start date and time
 * @param {Date} end - The end date and time
 * @returns {string} Formatted duration string in hours and minutes
 */
const formatDuration = (start: Date, end: Date): string => {
  const durationInMinutes = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60),
  );

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const hourText =
    hours % 10 === 1 && hours % 100 !== 11
      ? "час"
      : hours % 10 >= 2 &&
          hours % 10 <= 4 &&
          (hours % 100 < 10 || hours % 100 >= 20)
        ? "часа"
        : "часов";

  if (hours === 0) {
    return `${minutes} мин`;
  } else if (minutes === 0) {
    return `${hours} ${hourText}`;
  } else {
    return `${hours} ${hourText} ${minutes} мин`;
  }
};
</script>

<template>
  <NuxtLink
    class="w-full h-[172px] flex flex-col items-center px-4 py-2 rounded-[25px] cursor-pointer no-underline"
    :style="{ backgroundColor: color }"
    :to="`/events/${id}`"
  >
    <div class="w-full flex flex-row justify-between items-center">
      <span class="text-2xl font-bold text-text-gray/65">{{ title }}</span>
      <div class="flex flex-row gap-[2px] items-center">
        <span class="text-sm font-bold text-text-gray/65">{{ likes }}</span>
        <Icon
          name="material-symbols:favorite-outline"
          class="text-text-gray/65 w-[22px] h-[22px]"
        />
      </div>
    </div>
    <div
      class="w-full break-words line-clamp-4 text-xs font-semibold text-text-gray/65"
    >
      {{ description }}
    </div>
    <div class="grow"></div>
    <div class="w-full flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <span class="text-xl font-semibold text-text-gray/65">{{
          startDate.getHours().toString().padStart(2, "0") +
          ":" +
          startDate.getMinutes().toString().padStart(2, "0")
        }}</span>
        <span class="text-xs font-semibold text-text-gray/65">Начало</span>
      </div>
      <div class="px-4 py-2 bg-text-gray/65 rounded-[25px]">
        <span class="text-base font-bold" :style="{ color }">{{
          formatDuration(startDate, endDate)
        }}</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-xl font-semibold text-text-gray/65">{{
          endDate.getHours().toString().padStart(2, "0") +
          ":" +
          endDate.getMinutes().toString().padStart(2, "0")
        }}</span>
        <span class="text-xs font-semibold text-text-gray/65">Кончало</span>
      </div>
    </div>
  </NuxtLink>
</template>
