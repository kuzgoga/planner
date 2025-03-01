<template>
  <div class="bg-white w-full p-5">
    <MonthEventCard :color-number="1" :month :events="[]" :day-number="1"></MonthEventCard>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  month: string
}>()

const headers = useRequestHeaders(['cookie'])

useFetch("/api/events", {
  headers,
  onResponse: async ({ response: { text } }) => {
    console.log(await text())
  }
})

</script>

<style>

</style>