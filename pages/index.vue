<script setup lang="ts">
import type {
  GetFutureEventsResponse,
  GroupedEvents,
} from "~/server/models/events_routes";

definePageMeta({
  middleware: ["authenticated"],
});

const route = useRoute();
if (route.path === "/") {
  navigateTo("/today");
}
</script>

<template>
  <IndexRouter />
  <NuxtPage />
</template>

<style scoped></style>
