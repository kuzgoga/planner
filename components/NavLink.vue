<template>
  <NuxtLink class="text-accent-dark-yellow underline text-3xl font-bold" :to><slot></slot></NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
}>();
</script>

<style>

</style>