<script setup lang="ts">
import Hero from "~/components/main/hero.vue";
import Slider from "~/components/main/slider.vue";
useSeoMeta({
  title: () => $t("seo.home.title"),
  description: () => $t("seo.home.description"),
  keywords: () => $t("seo.home.keywords"),
  ogTitle: () => $t("seo.home.title"),
  ogDescription: () => $t("seo.home.description"),
  ogImage: "https://hannwnetrza.com/logo_white.png",
  ogUrl: "https://hannwnetrza.com",
  ogType: "website",
});

definePageMeta({
  navbar: "dynamic",
});
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
    <Hero />
    <div ref="secondSection" class="w-full flex flex-col items-center">
      <Slider />
    </div>
  </section>
</template>
