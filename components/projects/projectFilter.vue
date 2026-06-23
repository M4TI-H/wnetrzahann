<script setup lang="ts">
import SearchBar from "./searchBar.vue";

const galleryStore = useGalleryStore();
const isMounted = ref<boolean>(false);

const filters = [
  { id: "all", label: "projects.filters.all" },
  { id: "commercial", label: "projects.filters.commercial" },
  { id: "residential", label: "projects.filters.residential" },
  { id: "completed", label: "projects.filters.completed" },
];

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 50);
});
</script>

<template>
  <section
    class="w-full flex items-center justify-between flex-col-reverse xl:flex-row gap-4 md:gap-8 px-4 md:px-8 overflow-hidden"
  >
    <div
      class="w-full xl:w-1/2 min-w-48 grid grid-cols-2 xl:flex xl:items-center xl:justify-start gap-1 sm:gap-2 xl:gap-4 landscape:gap-1 landscape:sm:gap-2"
    >
      <button
        v-for="(filter, index) in filters"
        :key="filter.id"
        @click="galleryStore.filterProjects(filter.id)"
        :style="{
          '--entry-delay': `${index * 400}ms`,
          zIndex: 20 - index,
        }"
        class="filter-btn py-3 flex-1 lg:px-6 xl:px-8 border border-black text-xs sm:text-sm cursor-pointer focus:outline-none focus-visible:outline-1 focus-visible:outline-black w-full"
        :class="[
          galleryStore.filter === filter.id
            ? 'bg-neutral-800 text-gray-100'
            : 'bg-gray-100 text-black hover:bg-gray-300',
          isMounted ? 'is-active' : 'is-hidden',
        ]"
      >
        {{ $t(filter.label) }}
      </button>
    </div>

    <SearchBar />
  </section>
</template>
<style scoped>
.filter-btn {
  will-change: transform, opacity;
  white-space: nowrap;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.filter-btn.is-hidden {
  opacity: 0;
  transform: translateX(-110%);
}

.filter-btn.is-active {
  opacity: 1;
  transform: translateX(0);
  transition:
    transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) var(--entry-delay),
    opacity 1000ms cubic-bezier(0.25, 1, 0.5, 1) var(--entry-delay),
    background-color 0.3s ease 0s,
    color 0.3s ease 0s;
}
</style>
