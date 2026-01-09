<script setup lang="ts">
import type Project from "~/models/Project";
const deleteModalStore = useDeleteModalStore();
const projectStore = useProjectStore();

const prop = defineProps<{
  data: Project;
}>();
</script>

<template>
  <div class="w-full flex flex-col md:flex-row gap-2">
    <img :src="data.cover" class="object-cover h-48 lg:h-56" />
    <div class="flex-1 flex flex-col gap-1">
      <div class="w-full flex items-start justify-between">
        <p class="text-3xl">{{ data.name }}</p>
        <p class="text-sm text-gray-500">{{ data.creationDate }}</p>
      </div>
      <p class="text-sm sm:text-base">{{ data.category }}</p>
      <div class="flex items-center gap-2 text-xs">
        <i class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></i>
        <p class="text-sm sm:text-base">{{ data.area }} m&sup2;</p>
      </div>
      <p class="text-sm sm:text-base">Liczba zdjęć: 8</p>
      <div
        class="w-full md:w-min mt-auto ml-auto flex flex-col md:flex-row items-center gap-2"
      >
        <button
          @click="projectStore.openProjectForm('edit', data)"
          class="w-full md:w-min py-2 md:py-1 px-4 bg-gray-100 hover:bg-gray-200 text-sm md:text-base text-neutral-800 border border-black transition-colors duration-300 ease-in-out"
        >
          Edytuj
        </button>
        <button
          @click="deleteModalStore.openModal(data)"
          class="w-full md:w-min py-2 md:py-1 px-4 bg-neutral-800 hover:bg-black text-sm md:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out"
        >
          Usuń
        </button>
      </div>
    </div>
  </div>
</template>
