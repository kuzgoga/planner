import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@scalar/nuxt",
    "nuxt-typeorm",
    "@pinia/nuxt",
    "@nuxt/image",
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

  css: ["~/assets/css/main.css"],

  vite: {
    server: {
      allowedHosts: true,
    },
    plugins: [tailwindcss()],
  },
});
