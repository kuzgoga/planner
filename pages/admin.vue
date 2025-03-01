<script setup lang="ts">
const { clear } = useUserSession()
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>

<template>
  <a-flex vertical :gap="15" class="fixed h-screen top-0 left-0 w-1/5 bg-white">
    <h1 class="text-center mt-5 text-3xl font-bold text-blue-600">Админ-панель</h1>
    <a-button to="/admin/events" :size="'large'" @click="navigateTo('/admin/events')">Мероприятия</a-button>
    <a-button danger :size="'large'" @click="() => {
      clear();
      navigateTo('/start')
    }">Выйти</a-button>
  </a-flex>
  <div class="h-screen w-4/5 absolute right-0">
    <NuxtPage></NuxtPage>
  </div>
</template>