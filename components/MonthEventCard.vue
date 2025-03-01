<template>
  <div v-if="props.events.length" :class="['bg' + color, 'flex flex-col justify-center p-3 h-36 rounded-2xl relative z-10']">
    <p class="opacity-50 font-bold text-xl">Суббота</p>
    <h1 class="text-5xl opacity-50 font-semibold">{{ props.dayNumber }}</h1>
    <h2 class="text-4xl opacity-50 font-semibold">{{ props.month }}</h2>
    <div class="absolute top-3 right-3 flex flex-col items-end gap-1">
      <div class="flex items-center h-6 gap-1" v-for="(event, index) in props.events" :key="index">
        <div class="bg-black opacity-50 rounded-full px-3">
          <p :class="['text' + color, 'font-bold']">{{ event.name }}</p>
        </div>
        <p class="opacity-50 font-bold">{{ event.time }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="w-full flex items-center relative">
      <hr class="bg-black h-0.5 w-full" />
      <p class="absolute right-0 px-5 bg-white">{{ props.dayNumber }} {{ props.month.toLowerCase() }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface IMonthEventCard {
  dayNumber: number,
  colorNumber: 1 | 2 | 3,
  events: {
    name: string,
    time: string
  }[]
}

const color = computed(() => {
  switch (props.colorNumber) {
    case 1:
      return '-accent-pink'
    case 2:
      return '-accent-yellow'
    case 3:
      return '-accent-green'
  }
})

const props = defineProps<IMonthEventCard & { month: string, }>()
</script>

<style></style>