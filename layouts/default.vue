<template>
  <div class="w-screen h-screen bg-background">
    <Menu class="transition-[top]" :class="{
      '-top-full': !show,
      'top-0': show,
    }" v-model="show"></Menu>
    <button @click="show = true">show</button>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const show = ref(false);
</script>

<style>

</style>