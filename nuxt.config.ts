export default defineNuxtConfig({
  modules: [
    "@scalar/nuxt",
    "nuxt-jwt-auth",
    "nuxt-typeorm",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
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

  nuxtJwtAuth: {
    baseUrl: "http://localhost:3001/api", // URL of your backend
    endpoints: {
      login: "/login", // Where to request login (POST)
      logout: "/logout", // Where to request logout (POST)
      user: "/user", // Where to request user data (GET)
      signup: "/signup", // Where to request signup (POST)
    },
    redirects: {
      home: "/", // Where to redirect after successfull login and logout
      login: "/login", // Where to redirect if user is not logged in and accesses a logged-only route
      logout: "/logout", // Where to redirect if user is logged in and accesses a guest-only route
    },
  },

  compatibilityDate: "2025-02-27",
  
  vite: {
    server: {
      allowedHosts: true
    }
  },
  
});