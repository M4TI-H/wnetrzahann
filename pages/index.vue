<script setup lang="ts">
import Hero from "~/components/main/hero.vue";
import Slider from "~/components/main/slider.vue";

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
    <!-- <div class="w-full flex flex-col items-center gap-4 sm:gap-8">
      <h1 class="text-2xl mx-auto">PROCES TWORZENIA PROJEKTU</h1>
      <div class="w-full flex items-center"></div>
    </div> -->
    <!-- <div class="w-full flex flex-col items-center gap-4 sm:gap-8">
      <h2 class="text-4xl font-semibold text-center">ZAKRES USŁUG</h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-24 md:gap-x-48 gap-y-6 sm:gap-y-8"
      >
        <div class="flex items-center gap-4">
          <div class="size-6 border border-black bg-gray-100"></div>
          <p class="sm:text-lg font-semibold">Projekty wnętrz prywatnych</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="size-6 border border-black bg-gray-100"></div>
          <p class="sm:text-lg font-semibold">Projekty komercyjne</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="size-6 border border-black bg-gray-100"></div>
          <p class="sm:text-lg font-semibold">Konsultacje projektowe</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="size-6 border border-black bg-gray-100"></div>
          <p class="sm:text-lg font-semibold">Nadzór autorski</p>
        </div>
      </div>
      <button
        @click="openContactForm"
        class="mt-8 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out"
      >
        <i class="pi pi-envelope text-sm"></i>
        Porozmawiajmy o twoim wnętrzu
      </button>
    </div> -->
  </section>
</template>
