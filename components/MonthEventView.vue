<template>
  <div class="">
    <div class="flex items-center justify-center gap-3">
      <NuxtImg @click="() => {
        if (slide > 0) slide--;
      }" class="cursor-pointer h-4" src="/svg/arrow-left.svg"/>
      <h1 class="text-4xl font-semibold opacity-85 mt-4 mb-4 text-center">МАР</h1>
      <NuxtImg @click="() => {
        if (slide < maxSlide) slide++;
      }" class="cursor-pointer h-4" src="/svg/arrow-right.svg"/>
    </div>
    <div class="bg-white rounded-t-4xl py-5 w-screen">
      <MonthEventCard :color-number="1" :day-number="1" :events="[]" :month="'МАР'"></MonthEventCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
const slide = defineModel<number>({ default: 0 })
const maxSlide = 12
</script>

<style></style>