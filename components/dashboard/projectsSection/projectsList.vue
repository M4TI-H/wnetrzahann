<script setup lang="ts">
import ProjectSummary from "./projectSummary.vue";

const projectStore = useProjectStore();

const projects = [
  {
    id: 0,
    name: "F403",
    category: "Prywatny",
    creationDate: "2025",
    cover: "../indexImages/1.jpg",
    area: 100,
  },
  {
    id: 1,
    name: "F404",
    category: "Prywatny",
    creationDate: "2025",
    cover: "../indexImages/2.jpg",
    area: 100,
  },
  {
    id: 2,
    name: "F405",
    category: "Komercyjny",
    creationDate: "2025",
    cover: "../indexImages/3.jpg",
    area: 100,
  },
  {
    id: 3,
    name: "F406",
    category: "Komercyjny",
    creationDate: "2025",
    cover: "../indexImages/4.jpg",
    area: 100,
  },
  {
    id: 4,
    name: "F403",
    category: "Prywatny",
    creationDate: "2025",
    cover: "../indexImages/1.jpg",
    area: 100,
  },
  {
    id: 5,
    name: "F404",
    category: "Prywatny",
    creationDate: "2025",
    cover: "../indexImages/2.jpg",
    area: 100,
  },
  {
    id: 6,
    name: "F405",
    category: "Komercyjny",
    creationDate: "2025",
    cover: "../indexImages/3.jpg",
    area: 100,
  },
];
</script>

<template>
  <section
    class="flex-1 w-full lg:max-w-2/3 h-full p-4 border border-black flex flex-col gap-4 bg-white"
  >
    <div
      class="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
    >
      <h2 class="text-lg md:text-xl lg:text-2xl order-1">Projekty</h2>

      <input
        type="text"
        placeholder="Wyszukaj"
        class="order-3 sm:order-2 w-full sm:w-1/3 text-sm md:text-base p-2 border border-black outline-0"
      />

      <button
        @click="projectStore.openProjectForm('new')"
        class="order-2 sm:order-3 p-2 lg:px-8 bg-gray-100 hover:bg-gray-200 text-xs md:text-base text-neutral-800 border border-black flex items-center justify-center gap-2 lg:gap-4 transition-colors duration-300 ease-in-out"
      >
        <span class="text-sm md:text-base">Dodaj</span>
        <i class="pi pi-plus"></i>
      </button>
    </div>
    <div class="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <div v-for="(project, num) in projects" :key="project.id">
        <ProjectSummary :data="project" />
        <div
          v-if="num < projects.length - 1"
          class="w-full h-px bg-gray-500 mt-4"
        ></div>
      </div>
    </div>
  </section>
</template>
