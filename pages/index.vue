<script setup lang="ts">
const { data, error } = await useFetch("/api/ping");
</script>

<template>
  <h2 class="font-bold text-gray">Wellcum to the Boilerplate</h2>
  <Icon name="material-symbols:chevron-left-rounded" />
</template>

<style scoped></style>
