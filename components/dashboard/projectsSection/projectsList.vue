<script setup lang="ts">
import { useFetchProjects } from "~/composables/projects/useFetchProjects";
import ProjectSummary from "./projectSummary.vue";

const projectStore = useProjectStore();

const { projectsData, projectsLoading, projectsRefresh } = useFetchProjects();
const search = ref<string>("");

const filteredProjects = computed(() => {
  if (!projectsData.value) return [];
  if (!search.value.trim()) return projectsData.value;

  const term = search.value.toLowerCase().trim();

  return projectsData.value.filter((project) =>
    project.name.toLowerCase().includes(term)
  );
});

onMounted(async () => {
  await projectsRefresh();
});
</script>

<template>
  <section
    class="flex-1 w-full lg:max-w-2/3 flex flex-col gap-4 bg-white p-4 border border-black h-[700px] min-h-0"
  >
    <div
      class="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
    >
      <h2 class="text-lg md:text-xl lg:text-2xl order-1">Projekty</h2>

      <input
        v-model="search"
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
    <div
      v-if="filteredProjects"
      class="w-full h-full flex flex-col gap-4 overflow-y-auto pr-4"
    >
      <div v-for="(project, num) in filteredProjects" :key="project.id">
        <ProjectSummary :data="project" />
        <div
          v-if="num < filteredProjects.length - 1"
          class="w-full h-px bg-gray-500 mt-4"
        ></div>
      </div>
    </div>
    <div v-if="projectsLoading" class="w-full flex justify-center py-8">
      <i class="pi pi-spinner pi-spin"></i>
    </div>
    <div
      v-if="projectsData?.length === 0 && !projectsLoading"
      class="w-full flex justify-center py-8 text-gray-500"
    >
      Nie znaleziono projektów o nazwie "{{ search }}"
    </div>
  </section>
</template>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
}
</style>
