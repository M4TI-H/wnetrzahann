<script setup lang="ts">
import type Project from "~/models/Project";

const props = defineProps<{
  images: any;
  data: Project;
}>();

const emit = defineEmits<{
  (e: "showImage", id: number): void;
}>();

const vObserve = {
  mounted: (el: HTMLElement) => {
    el.classList.add("opacity-0", "translate-y-24");
    el.classList.add("transition-all", "duration-500", "ease-out");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-24");
            el.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "0px 0px -1% 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
  },
};
</script>
<template>
  <div
    class="relative w-full md:w-2/3 min-h-screen flex flex-col gap-4 pt-20 md:pt-24 pb-4 px-4 mx-auto"
  >
    <NuxtLink
      to="/projekty"
      class="group w-min flex md:hidden items-center gap-2 p-2 text-xs md:text-sm bg-gray-100 hover:bg-gray-200 active:bg-gray-200 outline-0 border border-black transition-colors duration-300 ease-in-out"
    >
      <i
        class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
      ></i>
      Powrót
    </NuxtLink>

    <div class="relative w-full flex flex-row items-start justify-between">
      <h1 class="md:hidden text-4xl font-semibold">{{ props.data.name }}</h1>
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
          {{ props.data.name }}
        </h1>
      </div>

      <div class="flex flex-col items-end">
        <p class="text-gray-500 text-xs md:text-sm">
          {{
            props.data.category[0].toUpperCase() + props.data.category.slice(1)
          }}
        </p>

        <div class="flex items-center gap-2 text-xs md:text-sm">
          <i class="pi pi-clock text-gray-500"></i>
          <p class="text-gray-500">{{ props.data.creation_date }}</p>
        </div>
        <div class="flex items-center gap-2 text-xs md:text-sm">
          <i
            class="pi pi-arrow-up-right-and-arrow-down-left-from-center text-gray-500"
          ></i>
          <p class="text-gray-500">{{ props.data.area }} m&sup2;</p>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8 w-full mx-auto overflow-hidden"
    >
      <div
        v-observe
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
