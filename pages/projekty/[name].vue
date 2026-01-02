<script setup lang="ts">
const route = useRoute();
const projectName = computed(() => String(route.params.name ?? ""));
definePageMeta({
  navbar: "compact",
});

const images = [
  {
    id: 0,
    image: "/projectImages/1.jpg",
  },
  {
    id: 1,
    image: "/projectImages/2.jpg",
  },
  {
    id: 2,
    image: "/projectImages/3.jpg",
  },
  {
    id: 3,
    image: "/projectImages/4.jpg",
  },
  {
    id: 4,
    image: "/projectImages/5.jpg",
  },
];
const activeIndex = ref<number>(0);
const setCurrent = (index: number) => {
  activeIndex.value = index;
};

const nextImage = () => {
  if (activeIndex.value === images.length - 1) return;
  activeIndex.value = activeIndex.value + 1;
};

const previousImage = () => {
  if (activeIndex.value === 0) return;
  activeIndex.value = activeIndex.value - 1;
};

const isImageHovered = ref<boolean>(false);
</script>

<template>
  <section class="flex-1 flex flex-col items-center gap-8">
    <div
      class="relative w-full md:w-2/3 min-h-screen flex flex-col gap-4 md:gap-8 pt-20 md:pt-28 pb-4 md:pb-8 px-4 md:px-0 mx-auto"
    >
      <div
        class="w-full flex flex-col md:flex-row items-start md:items-center justify-between md:gap-2"
      >
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/projekty"
            class="group w-min hidden md:flex p-3 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out"
          >
            <i
              class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
            ></i>
          </NuxtLink>
          <h1 class="text-4xl font-semibold">{{ projectName }}</h1>
        </div>
        <p class="text-gray-500">Projekt prywatny</p>
      </div>

      <!-- Fullscreen -->
      <div class="hidden md:flex flex-col items-center gap-4 mx-auto">
        <div
          @mouseenter="isImageHovered = true"
          @mouseleave="isImageHovered = false"
          class="relative w-full h-auto overflow-hidden"
        >
          <img
            :src="images[activeIndex].image"
            class="w-full h-full object-cover"
          />
          <button
            v-if="activeIndex > 0"
            @click="previousImage"
            :class="[isImageHovered ? 'opacity-100' : 'opacity-0']"
            class="absolute z-20 left-0 top-0 h-full bg-black/10 hover:bg-black/30 w-12 transition-all duration-300 ease-in-out"
          >
            <i class="pi pi-chevron-left text-2xl text-gray-100"></i>
          </button>
          <button
            v-if="activeIndex < images.length - 1"
            @click="nextImage"
            :class="[isImageHovered ? 'opacity-100' : 'opacity-0']"
            class="absolute z-20 right-0 top-0 h-full bg-black/10 hover:bg-black/30 w-12 transition-all duration-300 ease-in-out"
          >
            <i class="pi pi-chevron-right text-2xl text-gray-100"></i>
          </button>
        </div>

        <div class="flex items-center flex-wrap gap-2">
          <div
            v-for="img in images"
            :key="img.id"
            @click="setCurrent(img.id)"
            class="max-w-44 w-full h-32 overflow-hidden cursor-pointer border-2"
            :class="{
              'border-black': img.id === activeIndex,
              'border-transparent': img.id !== activeIndex,
            }"
          >
            <img :src="img.image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div class="flex md:hidden flex-col items-center gap-4 mx-auto">
        <div
          @mouseenter="isImageHovered = true"
          @mouseleave="isImageHovered = false"
          class="relative w-full h-auto overflow-hidden"
        >
          <img
            :src="images[activeIndex].image"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="scrollbar-hide flex w-full overflow-x-auto whitespace-nowrap gap-2"
        >
          <div
            v-for="img in images"
            :key="img.id"
            @click="setCurrent(img.id)"
            class="flex-shrink-0 max-w-32 w-full h-20 overflow-hidden cursor-pointer border-2"
            :class="{
              'border-black': img.id === activeIndex,
              'border-transparent': img.id !== activeIndex,
            }"
          >
            <img :src="img.image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col gap-4">
        <p class="md:text-lg text-gray-500">
          Głównym wyzwaniem tego projektu było wprowadzenie nowoczesnej
          funkcjonalności do wysokich, ale słabo doświetlonych wnętrz gdańskiej
          kamienicy. Zastosowano paletę barw opartą na złamanej bieli i
          naturalnym dębie, co optycznie powiększyło przestrzeń. Sercem
          apartamentu stała się otwarta strefa dzienna z antresolą, gdzie
          stalowe elementy konstrukcyjne nawiązują do industrialnej historii
          budynku.
        </p>
        <p class="md:text-lg">Data dodania: 29.12.2025</p>
      </div>
    </div>
  </section>
</template>
