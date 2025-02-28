<template>
  <nav class="w-screen h-screen bg-accent-red fixed">
    <Icon :size="30" name="material-symbols-light:close-rounded" class="cursor-pointer absolute right-4 top-4" @click="show = false"></Icon>
    <div class="flex flex-col items-end justify-end h-full p-4">
      <LogoutButton @click="logout" />
      <NavLink to="/events">мероприятия</NavLink>
      <NavLink to="/profile">профиль</NavLink>
      <NavLink to="/">главная</NavLink>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { navigateTo } from '#app';

const show = defineModel<boolean>();

const { clear } = useUserSession();

function logout() {
  clear();
  navigateTo("/start");
}
</script>

<style></style>