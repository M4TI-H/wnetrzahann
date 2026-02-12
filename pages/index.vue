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

  const isMediumScreen = window.innerWidth >= 768;

  const finalScrollPosition = isMediumScreen ? secondTop : secondTop - 60;
  snapping = true;

  window.scrollTo({
    top: finalScrollPosition,
    behavior: "smooth",
  });

  setTimeout(() => (snapping = false), 100);
};
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
    <Hero @scrollDown="scrollDown" />
    <div ref="secondSection" class="w-full flex flex-col items-center">
      <Slider />
    </div>
  </section>
</template>
