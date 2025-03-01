<template>
  <div class="w-full px-6 flex flex-row flex-wrap items-center gap-2">
    <NuxtLink
      to="/today"
      :class="['px-5 py-2 text-sm font-semibold border border-text-gray rounded-[20px] cursor-pointer transition', { 'bg-text-gray text-white': $route.path === '/today' }]">
      Сегодня
    </NuxtLink>
    <NuxtLink
      to="/calendar"
      :class="['px-5 py-2 text-sm font-semibold border border-text-gray rounded-[20px] cursor-pointer transition', { 'bg-text-gray text-white': $route.path === '/calendar' }]">
      Календарь
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>