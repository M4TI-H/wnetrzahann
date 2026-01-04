<script setup lang="ts">
const props = defineProps<{
  images: any;
  name: string;
}>();

const activeIndex = ref<number>(0);
const setCurrent = (index: number) => {
  activeIndex.value = index;
};

const nextImage = () => {
  if (activeIndex.value === props.images.length - 1) return;
  activeIndex.value = activeIndex.value + 1;
};

const previousImage = () => {
  if (activeIndex.value === 0) return;
  activeIndex.value = activeIndex.value - 1;
};

const isImageHovered = ref<boolean>(false);
</script>
<template>
  <div
    class="relative w-full md:w-2/3 min-h-screen hidden md:flex flex-col gap-4 md:gap-2 pt-20 md:pt-24 pb-4 md:pb-8 px-4 md:px-0 mx-auto"
  >
    <div class="w-full flex flex-row items-start justify-between md:gap-2">
      <div class="flex flex-col md:gap-2">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/projekty"
            class="group w-min hidden md:flex p-3 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out"
          >
            <i
              class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
            ></i>
          </NuxtLink>
          <h1 class="text-4xl font-semibold">{{ props.name }}</h1>
        </div>
        <p class="text-gray-500">Projekt prywatny</p>
      </div>

      <div class="flex flex-col items-end">
        <div class="flex items-center gap-2">
          <i class="pi pi-clock text-gray-500 text-sm" />
          <p class="text-gray-500 sm:text-lg">01.01.2026</p>
        </div>
        <div class="flex items-center gap-2">
          <i
            class="pi pi-arrow-up-right-and-arrow-down-left-from-center text-gray-500 text-sm"
          ></i>
          <p class="text-gray-500 sm:text-lg">100 m&sup2;</p>
        </div>
      </div>
    </div>

    <!-- Fullscreen -->
    <div class="flex flex-col items-center gap-4 mx-auto">
      <div
        @mouseenter="isImageHovered = true"
        @mouseleave="isImageHovered = false"
        class="relative w-full h-auto overflow-hidden"
      >
        <img
          :src="images[activeIndex].image"
          draggable="false"
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

      <div
        class="scrollbar-hide flex w-full overflow-x-auto whitespace-nowrap gap-2"
      >
        <div
          v-for="img in images"
          :key="img.id"
          @click="setCurrent(img.id)"
          class="flex-shrink-0 max-w-32 md:max-w-48 w-full h-20 md:h-32 overflow-hidden cursor-pointer border-2"
          :class="{
            'border-black': img.id === activeIndex,
            'border-transparent': img.id !== activeIndex,
          }"
        >
          <img
            :src="img.image"
            draggable="false"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
