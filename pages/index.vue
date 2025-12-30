<script setup lang="ts">
import { ref, watch } from "vue";
import Hero from "~/components/hero.vue";

const { y: scrollY } = useWindowScroll();

const secondSection = ref<HTMLElement | null>(null);

let snapping = false;
let lastScrollY = 0;

watch(
  () => scrollY.value,
  async (y) => {
    if (snapping || !secondSection.value) return;

    const direction = y < lastScrollY ? "up" : "down";
    lastScrollY = y;

    const heroHeight = window.innerHeight;
    const secondTop = secondSection.value.offsetTop;

    if (y < heroHeight && direction === "down") {
      snapping = true;

      window.scrollTo({
        top: secondTop - 64,
        behavior: "smooth",
      });

      setTimeout(() => (snapping = false), 100);
      return;
    }
  }
);
</script>

<template>
  <section class="flex-1 flex flex-col items-center gap-8">
    <Hero />
    <div
      ref="secondSection"
      class="w-full min-h-screen flex flex-col items-center gap-4 py-2 sm:py-4 px-4 sm:px-8"
    >
      <h1 class="text-4xl font-bold">PROJEKTY</h1>
      <div class="w-full flex flex-col items-center justify-between">
        <Slider />
      </div>
      <div class="w-full h-32"></div>
      <div class="w-full h-32 bg-gray-300"></div>
    </div>
  </section>
</template>
