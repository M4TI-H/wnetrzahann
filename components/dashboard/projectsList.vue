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
    class="flex-1 w-full lg:max-w-2/3 p-4 border border-black flex flex-col gap-4 bg-white"
  >
    <div class="w-full flex items-center justify-between">
      <h2 class="text-lg md:text-xl lg:text-2xl">Projekty</h2>
      <button
        @click="projectStore.openProjectForm('new')"
        class="p-2 lg:px-8 bg-gray-100 hover:bg-gray-200 md:text-base text-neutral-800 border border-black transition-colors duration-300 ease-in-out"
      >
        <i class="pi pi-plus"></i>
      </button>
    </div>
    <div v-for="(project, num) in projects" :key="project.id">
      <ProjectSummary :data="project" />
      <div
        v-if="num < projects.length - 1"
        class="w-full h-px bg-gray-500 mt-4"
      ></div>
    </div>
  </section>
</template>
