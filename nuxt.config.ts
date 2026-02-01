import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "pl",
      },
      link: [{ rel: "icon", type: "image/png", href: "/logo-compact.png" }],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "theme-color", content: "#D6DEE3" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["assets/style.css"],
  supabase: {
    redirect: false,
    cookieOptions: {
      maxAge: 3600,
      sameSite: "lax",
    },
  },
  i18n: {
    locales: [
      { code: "pl", iso: "pl-PL" },
      { code: "en", iso: "en-US" },
    ],
    defaultLocale: "pl",
    strategy: "prefix_except_default",
    vueI18n: "~/i18n.config.ts",
  },
});
