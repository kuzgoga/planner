<script setup lang="ts">
import type { GetEventByIdResponse } from "~/server/models/events_routes";

const id = parseInt(useRoute().params.id as string);

const eventResponse = await useFetch<GetEventByIdResponse>(
  "/api/event?id=" + id,
);
if (!eventResponse.data.value) {
  throw createError({ statusCode: 404, statusMessage: "Event not found" });
}
const event = eventResponse.data.value;
console.log(event);
</script>

<template>
  <img :src="event.preview_path" alt="Event Image" />
</template>
