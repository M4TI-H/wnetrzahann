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
    class="relative w-full md:w-2/3 min-h-screen flex md:hidden flex-col gap-4 pt-20 pb-4 px-4 mx-auto"
  >
    <NuxtLink
      to="/projekty"
      class="group w-min flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 outline-0 border border-black transition-colors duration-300 ease-in-out"
    >
      <i
        class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
      ></i>
      Powrót
    </NuxtLink>

    <div class="w-full flex flex-row items-start justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-4">
          <h1 class="text-4xl font-semibold">{{ props.name }}</h1>
        </div>
        <p class="text-gray-500">Projekt prywatny</p>
      </div>

      <div class="flex flex-col items-end">
        <div class="flex items-center gap-2">
          <i class="pi pi-clock text-gray-500 text-sm"></i>
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
    <div class="grid grid-cols-2 gap-2 md:hidden w-full mx-auto">
      <img
        v-for="(image, idx) in images"
        :key="image.id"
        :src="image.image"
        draggable="false"
        :class="[
          idx % 3 === 0 ||
          (idx === images.length - 1 && images.length % 3 === 2)
            ? 'col-span-2 h-auto'
            : 'col-span-1 h-32',
          'object-cover w-full',
        ]"
      />
    </div>
  </div>
</template>
