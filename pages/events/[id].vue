<script setup lang="ts">
const id = parseInt(useRoute().params.id as string);
if (isNaN(id)) {
  await navigateTo("/events");
}
</script>

<template></template>
