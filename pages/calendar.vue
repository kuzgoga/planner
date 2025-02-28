<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <div class="w-full px-6 flex flex-row flex-wrap items-center gap-2">
    <button
      class="px-5 py-2 text-sm font-semibold border border-text-gray rounded-[20px] cursor-pointer"
      @click="navigateTo('/')"
    >
      Сегодня
    </button>
    <button
      class="px-5 py-2 text-sm font-semibold border border-text-gray rounded-[20px] cursor-pointer bg-text-gray text-white"
    >
      Календарь
    </button>
  </div>
</template>

<style scoped></style>
