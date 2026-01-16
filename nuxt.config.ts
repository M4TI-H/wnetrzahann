export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  app: {
    head: {
      title: "Agata Hann | Architektura Wnętrz",
      link: [{ rel: "icon", type: "image/png", href: "/logo-compact.png" }],
    },
  },
  css: ["assets/style.css"],
  supabase: {
    redirect: false,
    types: false,
    cookieOptions: {
      maxAge: 3600,
      sameSite: "lax",
    },
  },
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
    vueI18n: "~/i18n.config.ts",
  },
});
