<template>
  <div class="">
    <div class="flex items-center justify-center gap-3">
      <h2 @click="increment" class="font-semibold cursor-pointer mt-4 mb-4 text-4xl opacity-50 relative right-4">{{ months[(monthNumber - 1 + 12) % 12] }}</h2>
      <NuxtImg @click="increment" class="cursor-pointer h-4" src="/svg/arrow-left.svg" />
      <h1 class="text-4xl font-semibold opacity-85 mt-4 mb-4 text-center">{{ months[monthNumber] }}</h1>
      <NuxtImg @click="decrement" class="cursor-pointer h-4" src="/svg/arrow-right.svg" />
      <h2 @click="decrement" class="font-semibold cursor-pointer mt-4 mb-4 text-4xl opacity-50 relative left-4">{{ months[(monthNumber + 1) % 12] }}</h2>
    </div>
    <div class="bg-white rounded-t-4xl py-5 w-screen h-[84vh]">
      <template v-for="day in getMaxMonthDays(monthNumber)">
        <MonthEventCard v-if="events[months[monthNumber]]?.[day.toString() as any]" :color-number="<any>(day % 3 + 1)" :day-number="day" :events="<any>events[months[monthNumber]]?.[day.toString() as any]" :month="months[monthNumber]">
        </MonthEventCard>
          <div v-else class="w-full flex items-center relative mt-5 opacity-80">
            <hr class="bg-black h-0.5 w-full mx-5 opacity-80" />
            <p class="absolute right-0 w-20 text-end mr-5 bg-white">{{ day }} {{ months[monthNumber] }}</p>
          </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { months } from '~/server/models/events_routes';
import type { IEvent } from './MonthEventCard.vue';

const slide = defineModel<number>({ default: 0 })
const maxSlide = 12

function increment() {
if (slide.value > 0) slide.value--;
}

function decrement() {
  if (slide.value < maxSlide) slide.value++;
}

defineProps<{
  monthNumber: number
  events: {
    [key in string]: IEvent[]
  }
}>()
</script>

<style></style>