<script setup lang="ts">
import Hero from "~/components/main/hero.vue";
import Slider from "~/components/main/slider.vue";

useSeoMeta({
  title: () => $t("seo.home.title"),
  description: () => $t("seo.home.description"),
  keywords: () => $t("seo.home.keywords"),
  ogTitle: () => $t("seo.home.title"),
  ogDescription: () => $t("seo.home.description"),
  ogImage: "https://hannwnetrza.pl/logo_white.png",
  ogUrl: "https://hannwnetrza.pl",
  ogType: "website",
});

definePageMeta({
  navbar: "dynamic",
});

const secondSection = ref<HTMLElement | null>(null);

let snapping = false;

const scrollDown = () => {
  if (snapping || !secondSection.value) return;

  const secondTop = secondSection.value.offsetTop;

  snapping = true;

  window.scrollTo({
    top: secondTop - 64,
    behavior: "smooth",
  });

  setTimeout(() => (snapping = false), 100);
};
</script>

<template>
  <section class="flex-1 flex flex-col items-center gap-8 md:gap-12 pb-20">
    <Hero @scrollDown="scrollDown" />
    <div
      ref="secondSection"
      class="w-full flex flex-col items-center gap-4 md:gap-8 pt-4 px-4 sm:px-8"
    >
      <h1 class="text-2xl mx-auto">{{ $t("main.section1") }}</h1>
      <div class="w-full flex flex-col items-center justify-between">
        <Slider />
      </div>
    </div>
  </section>
</template>
