<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});


</script>

<template>
  <IndexRouter />
  <NuxtPage />
</template>

<style scoped></style>
