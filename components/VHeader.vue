<template>
  <div class="flex items-center h-12 justify-between">
    <div class="flex items-center gap-4 h-full">
      <img src="/png/avatar.png" class="h-full" />
      <div class="flex flex-col justify-around align-start">
        <h5 class="text-sm">Willkommen zurück,</h5>
        <h1 class="text-xl font-semibold">Дима Андреев</h1>
      </div>
    </div>
    <NuxtImg src="/svg/settings.svg" class="w-6 cursor-pointer" @click="showMenu = true" />
  </div>
</template>

<script lang="ts" setup>
const showMenu = defineModel<boolean>();
</script>

<style></style>