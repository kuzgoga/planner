<template>
  <div class="w-screen h-screen bg-background">
    <Menu class="transition-[top]" :class="{
      '-top-full': !show,
      'top-0': show,
    }" v-model="show"></Menu>
    <div class="pt-5 p-6">
      <VHeader v-model="show"/>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const show = ref(false);
</script>

<style>

</style>