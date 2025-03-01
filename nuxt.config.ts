import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@scalar/nuxt",
    "nuxt-typeorm",
    "@pinia/nuxt",
    "@nuxt/image",
    "nuxt-auth-utils",
    "@nuxt/fonts",
    "@nuxt/icon",
    "vue3-carousel-nuxt",
    "nuxt-file-storage",
  ],
  devtools: {
    enabled: true,
  },
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
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "planner",
    synchronize: true,
    logging: true,
    migrations: ["./migrations/*.ts"],
    migrationsRun: true,
  },

  fileStorage: {
    mount: process.env.mount,
  },

  compatibilityDate: "2025-02-27",

  css: ["~/assets/css/main.css"],

  vite: {
    server: {
      allowedHosts: true,
    },
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [{ name: "Nunito Sans", fallbacks: ["sans-serif"] }],
    experimental: {
      processCSSVariables: true,
    },
  },

  icon: {
    serverBundle: {
      collections: ["material-symbols"],
    },
  },
});
