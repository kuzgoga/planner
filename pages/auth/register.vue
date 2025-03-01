<script setup lang="ts">
import type { SignUpResponse } from "~/server/models/signup";
import type { ResponseError } from "~/server/models/error";

definePageMeta({
  layout: "auth",
});

const fullName = defineModel<string>("fullName");
const email = defineModel<string>("email");
const password = defineModel<string>("password");
const repeatPassword = defineModel<string>("repeatPassword");
const errorTimeout = ref<NodeJS.Timeout>();
const errorText = ref<string>("");

const showError = (message: string) => {
  errorText.value = message;
  clearTimeout(errorTimeout.value);
  errorTimeout.value = setTimeout(() => {
    errorText.value = "";
  }, 3000);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleRegister = async () => {
  const [firstName, lastName] = (fullName.value || "").split(" ");

  if (!firstName || !lastName) {
    showError("Введите имя и фамилию через пробел");
    return;
  } else if (!validateEmail(email.value || "")) {
    showError("Введите корректный адрес электронной почты");
    return;
  } else if (!password.value) {
    showError("Введите пароль");
    return;
  } else if (password.value !== repeatPassword.value) {
    showError("Пароли не совпадают");
    return;
  }

  try {
    await $fetch<SignUpResponse>("/api/auth/signup", {
      method: "POST",
      body: {
        firstName,
        lastName,
        email: email.value,
        password: password.value,
      },
    });
  } catch (error) {
    const responseError = error as { data: ResponseError };
    const errorMessage =
      responseError.data?.statusMessage || "Неизвестная ошибка";
    showError(errorMessage);
    return;
  }

  await navigateTo("/", { external: true });
};
</script>

<template>
  <div
    class="relative w-screen h-dvh overflow-hidden flex flex-col justify-center items-center"
  >
    <IconsRegisterTitle />
    <TextInput
      v-model="fullName"
      placeholder="Введите имя и фамилию"
      class="mt-6"
    />
    <TextInput v-model="email" placeholder="Введите почту" class="mt-6" />
    <TextInput
      type="password"
      v-model="password"
      placeholder="Введите пароль"
      class="mt-6"
    />
    <TextInput
      type="password"
      v-model="repeatPassword"
      placeholder="Повторите пароль"
      class="mt-6"
    />
    <PrimaryButton class="mt-6" @click="handleRegister">
      <template #title>Зарегистрироваться</template>
      <template #description>Доступно только для отличников</template>
    </PrimaryButton>
    <span class="text-center text-sm font-bold mt-1">
      Уже есть аккаунт? <NuxtLink class="text-text-brown underline" to="/auth/login">Войти</NuxtLink>
    </span>
    <span class="text-center text-sm font-bold text-red-500">
      &nbsp;{{ errorText }}&nbsp;
    </span>
  </div>
</template>
