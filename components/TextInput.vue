<script setup lang="ts">
const model = defineModel<string>();
const props = defineProps<{
  placeholder?: string
}>();
</script>

<template>
  <input
    type="text"
    v-model="model"
    :placeholder="placeholder"
    class="w-full h-fit bg-transparent px-6 py-5 text-xl font-semibold text-text-gray placeholder-border-gray border border-border-gray rounded-[30px] outline-none"
  />
</template>
