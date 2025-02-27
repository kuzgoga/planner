// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@scalar/nuxt"],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  scalar: {
    pathRouting: {
      basePath: "/scalar",
    },
  },
  pages: false,
});
