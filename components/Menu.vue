<template>
  <nav class="w-screen h-screen bg-accent-red fixed z-50">
    <Icon
      :size="30"
      name="material-symbols-light:close-rounded"
      class="cursor-pointer absolute right-4 top-4"
      @click="show = false"
    ></Icon>
    <div class="flex flex-col items-end justify-end h-full p-4">
      <LogoutButton @click="logout" />
      <NavLink to="/events" @click="show = false">мероприятия</NavLink>
      <NavLink to="/profile" @click="show = false">профиль</NavLink>
      <NavLink to="/" @click="show = false">главная</NavLink>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { navigateTo } from "#app";

const show = defineModel<boolean>({ default: false });

const { clear } = useUserSession();

function logout() {
  clear();
  navigateTo("/start");
}
</script>

<style></style>
