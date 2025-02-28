<script setup lang="ts">
const { data, error } = await useFetch<User[]>("/api/user", {
  method: "POST",
  body: {
    sex: true,
    token: "your_token_here",
  } as { sex: true },
});
</script>

<template>
  <h2 class="text-2xl font-bold">Wellcum to the Boilerplate</h2>
</template>
