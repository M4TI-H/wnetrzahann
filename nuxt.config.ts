export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
  ],
  app: {
    head: {
      title: "Agata Hann | Architektura Wnętrz",
      link: [{ rel: "icon", type: "image/png", href: "/logo-white.png" }],
    },
  },
  css: ["assets/style.css"],
  supabase: {
    redirect: false,
    types: false,
  },
});
