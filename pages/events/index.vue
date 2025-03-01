<script setup lang="ts">
import type {
  GetFutureEventsResponse,
  GroupedEvents,
} from "~/server/models/events_routes";
import { Event } from "~/server/entities/event.entity";

definePageMeta({
  middleware: ["authenticated"],
});

const { data: events, error } =
  await useFetch<GetFutureEventsResponse>("/api/events");
const eventsData = (error.value ? {} : events.value) as GetFutureEventsResponse;

const flattenEvents = computed(() => {
  if (!eventsData) return [];

  return Object.values(eventsData).flatMap((dateEvents) =>
    Object.values(dateEvents || {}).flat(),
  );
});

const eventColors = ["#BBE19E", "#FDE1AB", "#F4B0C0"];
</script>

<template>
  <section
    class="grow w-full mt-4 bg-white rounded-t-[35px] p-6 flex flex-col gap-2"
  >
    <span class="text-text-gray text-xl font-bold mb-2">
      Мероприятия сегодня
    </span>
    <AvailableEventCard
      v-for="(event, index) in flattenEvents"
      :key="event.id"
      :id="event.id"
      :title="event.title"
      :description="event.description"
      :start-date="new Date(event.start)"
      :end-date="new Date(event.end)"
      :likes="event.likes.length"
      :color="eventColors[index % eventColors.length]"
    />
    <div
      v-if="!flattenEvents.length"
      class="text-center py-4 text-text-gray/70"
    >
      Нет мероприятий на сегодня
    </div>
  </section>
</template>

<style scoped></style>
