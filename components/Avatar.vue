<template>
  <div class="rounded-full w-12 aspect-square bg-accent-green flex items-center justify-center">
    <p class="font-bold">{{ initials }}</p>
  </div>
</template>

<script lang="ts" setup>
const name = useUseUserName();
const initials = computed(() => {
  return name.split(' ').map((n) => n[0]).join('');
});
</script>

<style>

</style>