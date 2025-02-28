<script setup lang="ts">
import type { LoginResponse } from "~/server/models/login";

const email = defineModel<string>("email");
const password = defineModel<string>("password");
const errorText = ref<string>("");

const showError = (message: string) => {
  errorText.value = message;
  setTimeout(() => {
    errorText.value = "";
  }, 3000);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleLogin = async () => {
  if (!validateEmail(email.value || "")) {
    showError("Введите корректный адрес электронной почты");
    return;
  } else if (!password.value) {
    showError("Введите пароль");
    return;
  }

  const response = await useFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: { email: email.value, password: password.value },
  });

  console.log(response);
};
</script>

<template>
  <div
    class="relative w-screen h-dvh -mt-12 overflow-hidden flex flex-col justify-center items-center"
  >
    <IconsLoginTitleIcon />
    <TextInput v-model="email" placeholder="Введите почту" class="mt-[82px]" />
    <TextInput
      type="password"
      v-model="password"
      placeholder="Введите пароль"
      class="mt-6"
    />
    <PrimaryButton class="mt-12" @click="handleLogin">
      <template #title>Войти на платформу</template>
      <template #description>Доступно только для отличников</template>
    </PrimaryButton>
    <span class="text-center text-sm font-bold mt-1">
      Нет аккаунта? <a href="/auth/register">Зарегистрироваться</a>
    </span>
    <span class="text-center text-sm font-bold text-red-500">
      &nbsp;{{ errorText }}&nbsp;
    </span>
  </div>
</template>
