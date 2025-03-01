import { Role } from "~/server/models/role";

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user: { value } } = useUserSession();
  const role = value?.role
  if (!loggedIn.value || role != Role.ADMIN) {
    return navigateTo(to.path === "/" ? "/start" : "/auth/login");
  }
});
