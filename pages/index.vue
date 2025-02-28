<script setup lang="ts">
const { data, error } = await useFetch("/api/ping");
</script>

<template>
  <h2 class="font-bold text-blue-400">Wellcum to the Boilerplate</h2>
</template>

<style scoped></style>
