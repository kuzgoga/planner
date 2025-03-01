<script setup lang="ts">
import type { GetFutureEventsResponse } from '~/server/models/events_routes'

const headers = useRequestHeaders(['cookie'])

const events = useState<GetFutureEventsResponse | null>(() => null)

useFetch<GetFutureEventsResponse>("/api/events", {
    headers,
}).then(({ data }) => {
    events.value = data.value
})

const keys = computed(() => {
    if (events.value === null) {
        return []
    }
    return Object.keys(events.value).map(el => el.slice(0, el.length - 8)) as (keyof GetFutureEventsResponse)[]
})


</script>

<template>
    <div>
        <Carousel>
            <Slide v-for="key in keys" :key>
                {{ key }}
            </Slide>
        </Carousel>
    </div>
</template>