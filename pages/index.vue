<script setup lang="ts">
const sex = defineModel<string>("sex", { required: true, default: "Не дали" });

watch(sex, (newValue) => {
  console.log(newValue);
});
</script>

<template>
  <TextInput v-model="sex" placeholder="Введите секс" />
  <PrimaryButton>
    <template v-slot:title>Войти на платформу</template>
    <template v-slot:description>Доступно только для отличников</template>
  </PrimaryButton>
</template>

<style scoped></style>
