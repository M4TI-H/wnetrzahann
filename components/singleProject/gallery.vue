<script setup lang="ts">
const props = defineProps<{
  images: any;
  name: string;
}>();

const emit = defineEmits<{
  (e: "showImage", id: number): void;
}>();
</script>
<template>
  <div
    class="relative w-full md:w-2/3 min-h-screen flex flex-col gap-4 pt-24 pb-4 px-4 mx-auto"
  >
    <NuxtLink
      to="/projekty"
      class="group w-min flex md:hidden items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 outline-0 border border-black transition-colors duration-300 ease-in-out"
    >
      <i
        class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
      ></i>
      Powrót
    </NuxtLink>

    <div class="relative w-full flex flex-row items-start justify-between">
      <h1 class="md:hidden text-4xl font-semibold">{{ props.name }}</h1>
      <div class="hidden md:flex items-center flex-1 gap-4">
        <NuxtLink
          to="/projekty"
          class="group flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out"
        >
          <i
            class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
          ></i>
          Powrót
        </NuxtLink>
        <h1 class="absolute left-1/2 -translate-x-1/2 text-5xl">
          {{ props.name }}
        </h1>
      </div>

      <div class="flex flex-col items-end">
        <p class="text-gray-500">Projekt prywatny</p>

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
    <div class="grid grid-cols-2 gap-2 w-full mx-auto">
      <div
        v-for="(image, idx) in images"
        @click="emit('showImage', image.id)"
        :key="image.id"
        class="relative overflow-hidden cursor-pointer"
        :class="[
          Number(idx) % 3 === 0 ||
          (idx === images.length - 1 && images.length % 3 === 2)
            ? 'col-span-2 h-auto'
            : 'col-span-1 h-32 md:h-80',
        ]"
      >
        <img
          :src="image.image"
          draggable="false"
          class="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  </div>
</template>
