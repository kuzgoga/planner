<template>
  <div>
    <div
      class="max-w-screen overflow-hidden flex flex-col items-start top-4 relative"
    >
      <BackgroundText v-for="(phrase, index) in phrases" :key="index">{{
        phrase
      }}</BackgroundText>
    </div>
    <NuxtImg
      src="/svg/circles.svg"
      class="fixed left-16 bottom-24 w-36"
    ></NuxtImg>
    <NuxtImg
      src="/svg/ring.svg"
      class="fixed right-0 bottom-14 rotate-45"
    ></NuxtImg>
    <PrimaryButton
      class="fixed bottom-4 z-20"
      @click="navigateTo('/auth/login')"
    >
      <template #title>
        <h1>Далее</h1>
      </template>
    </PrimaryButton>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "start-page",
});

const phrases = [
  "Вдохновение",
  "Дух",
  "Азарт",
  "Команда",
  "Единство",
  "Цель",
  "Преодоление",
  "Маршрут",
  "Легенда",
  "Традиции",
  "Открытие",
  "Стремление",
  "Энергия",
];
</script>

<style></style>
