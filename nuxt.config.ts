export default defineNuxtConfig({
  modules: [
    "@scalar/nuxt",
    "nuxt-typeorm",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-auth-utils",
  ],

  nitro: {
    experimental: {
      openAPI: true,
    },
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          strictPropertyInitialization: false,
        },
      },
    },
  },

  typeorm: {
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
  },

  compatibilityDate: "2025-02-27",

  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
