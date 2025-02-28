<template>
  <div>
    <div class="flex flex-col items-start top-4 relative">
      <BackgroundText v-for="(phrase, index) in phrases" :key="index">{{
        phrase
      }}</BackgroundText>
    </div>
    <div class="absolute bottom-10 w-full overflow-hidden h-72">
      <NuxtImg
        src="/svg/circles.svg"
        class="absolute left-16 bottom-20 w-36"
      ></NuxtImg>
      <NuxtImg
        src="/svg/ring.svg"
        class="absolute right-0 bottom-10 rotate-45"
      ></NuxtImg>
      <PrimaryButton
        class="absolute bottom-0 z-20"
        @click="navigateTo('/auth/login')"
      >
        <template #title>
          <h1>Далее</h1>
        </template>
      </PrimaryButton>
    </div>
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
  "Стермпение",
  "Энергия",
];
</script>

<style></style>
