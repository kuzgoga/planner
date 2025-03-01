<script setup lang="ts">
import type { GetFutureEventsResponse } from '~/server/models/events_routes'

const headers = useRequestHeaders(['cookie'])

const response = useState<GetFutureEventsResponse | null>(() => null)

useFetch<GetFutureEventsResponse>("/api/events", {
    headers,
}).then(({ data }) => {
    response.value = data.value
})

const slide = ref(0)

</script>

<template>
    <ClientOnly>
        <Carousel :carouselConfig="{itemsToShow: 1}" v-model="slide">
            <Slide v-for="i in 12">
                <MonthEventView v-model="slide"></MonthEventView>
            </Slide>
        </Carousel>
    </ClientOnly>
</template>