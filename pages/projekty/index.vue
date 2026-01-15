<script setup lang="ts">
import ProjectCard from "~/components/projects/projectCard.vue";
import ProjectFilter from "~/components/projects/projectFilter.vue";
import { useFetchGalleryProjects } from "~/composables/gallery/useFetchGalleryProjects";

definePageMeta({
  navbar: "compact",
});

const route = useRoute();
const router = useRouter();
const galleryStore = useGalleryStore();

const displayedItems = ref<number>(6);

const { projectsData, projectsLoading, projectsRefresh } =
  useFetchGalleryProjects({
    getCategory: () => galleryStore.filter,
    getSearch: () => galleryStore.searchQuery,
    getLimit: () => displayedItems.value,
  });

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

watch(
  () => galleryStore.filter,
  (newFilter) => {
    const categoryValue = newFilter as unknown as string;

    displayedItems.value = 6;

    router.push({
      query: {
        ...route.query,
        category: categoryValue === "wszystkie" ? undefined : categoryValue,
      },
      replace: true,
    });
  }
);

watch(
  () => galleryStore.searchQuery,
  () => {
    displayedItems.value = 6;
  }
);

onMounted(async () => {
  const queryCategory = route.query.category as string;
  if (
    queryCategory &&
    ["prywatne", "komercyjne", "wszystkie"].includes(queryCategory)
  ) {
    galleryStore.filter = queryCategory as string;
  }

  await projectsRefresh();
});
</script>

<template>
  <section
    class="flex-1 w-full min-h-screen flex flex-col items-center gap-4 md:gap-8 bg-white pt-24 pb-8"
  >
    <h1 class="text-2xl sm:text-3xl lg:text-4xl">
      PROJEKTY{{
        galleryStore.searchQuery !== ""
          ? ` - "${galleryStore.searchQuery}"`
          : ""
      }}
    </h1>
    <ProjectFilter />

    <div v-if="!projectsLoading && projectsData.length === 0" class="my-auto">
      <p class="text-center px-4">Brak projektów spełniających kryteria.</p>
    </div>

    <div
      :key="galleryStore.filter"
      class="w-full grid md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-8 transition-opacity duration-300 overflow-hidden"
      :class="{
        'opacity-70 pointer-events-none':
          projectsLoading && projectsData.length > 0,
      }"
    >
      <div v-for="project in projectsData" :key="project.id" v-observe>
        <ProjectCard :data="project" />
      </div>
    </div>

    <button
      v-if="projectsData && projectsData.length === displayedItems"
      @click="displayedItems += 6"
      class="px-6 py-2 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
    >
      {{ projectsLoading ? "Wczytywanie" : "Pokaż więcej" }}
    </button>
  </section>
</template>
