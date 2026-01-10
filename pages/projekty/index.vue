<script setup lang="ts">
import ProjectCard from "~/components/projects/projectCard.vue";
import ProjectFilter from "~/components/projects/projectFilter.vue";
import SearchBar from "~/components/projects/searchBar.vue";

definePageMeta({
  navbar: "compact",
});

const projects = [
  {
    id: 0,
    name: "F403",
    category: "Prywatny",
    creation_date: "2025",
    area: 100,
    cover: "indexImages/1.jpg",
  },
  {
    id: 1,
    name: "F404",
    category: "Prywatny",
    creation_date: "2025",
    cover: "/indexImages/2.jpg",
    area: 100,
  },
  {
    id: 2,
    name: "F405",
    category: "Komercyjny",
    creation_date: "2025",
    cover: "/indexImages/3.jpg",
    area: 100,
  },
  {
    id: 3,
    name: "F406",
    category: "Komercyjny",
    creation_date: "2025",
    cover: "/indexImages/4.jpg",
    area: 100,
  },
  {
    id: 4,
    name: "F403",
    category: "Prywatny",
    creation_date: "2025",
    cover: "/indexImages/1.jpg",
    area: 100,
  },
  {
    id: 5,
    name: "F404",
    category: "Prywatny",
    creation_date: "2025",
    cover: "/indexImages/2.jpg",
    area: 100,
  },
  {
    id: 6,
    name: "F405",
    category: "Komercyjny",
    creation_date: "2025",
    cover: "/indexImages/3.jpg",
    area: 100,
  },
];

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
  <section
    class="flex-1 w-full min-h-screen flex flex-col items-center gap-8 bg-white pt-24 pb-8"
  >
    <h1 class="text-4xl">PROJEKTY</h1>
    <SearchBar />
    <ProjectFilter />

    <div class="w-full grid md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-8">
      <div v-for="project in projects" :key="project.id" v-observe>
        <ProjectCard :data="project" />
      </div>
    </div>

    <button
      class="px-6 py-2 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
    >
      Pokaż więcej
    </button>
  </section>
</template>
