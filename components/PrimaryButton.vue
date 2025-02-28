<script setup lang="ts"></script>

<template>
  <button
    class="w-full h-[90px] flex flex-col justify-center items-center bg-accent-red border border-gray/65 rounded-[50px] cursor-pointer"
  >
    <span class="text-2xl font-extrabold">
      <slot name="title"></slot>
    </span>
    <span class="text-base font-bold opacity-55 mt-[-6px]">
      <slot name="description"></slot>
    </span>
  </button>
</template>

<style scoped></style>
