<script setup lang="ts">
import {
  months,
  type GetFutureEventsResponse,
} from "~/server/models/events_routes";

definePageMeta({
  middleware: ["authenticated"],
});

const headers = useRequestHeaders(["cookie"]);

const events = useState<any>(() => []);

useFetch<GetFutureEventsResponse>("/api/events", {
  headers,
}).then(({ data }) => {
  for (const month of months) {
    if (!data.value![month as any]) events.value[month] = [];
    else events.value[month] = data.value![month as any];
  }
});

const slide = ref(new Date().getMonth());
</script>

<template>
  <ClientOnly>
    <Carousel :carouselConfig="{ itemsToShow: 1 }" v-model="slide">
      <Slide v-for="i in 12">
        <MonthEventView
          v-model="slide"
          :monthNumber="i - 1"
          :events
          class="h-full"
        ></MonthEventView>
      </Slide>
    </Carousel>
  </ClientOnly>
</template>

<style></style>
