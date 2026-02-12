<script setup lang="ts">
import SearchBar from "./searchBar.vue";

const galleryStore = useGalleryStore();
const isMounted = ref<boolean>(false);

const filters = [
  { id: "all", label: "projects.filters.all" },
  { id: "commercial", label: "projects.filters.commercial" },
  { id: "residential", label: "projects.filters.residential" },
];

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 50);
});
</script>

<template>
  <section
    class="w-full flex items-center justify-between flex-col-reverse sm:flex-row gap-4 md:gap-8 px-4 md:px-8 overflow-hidden"
  >
    <div
      class="w-full sm:w-1/2 min-w-48 flex items-center justify-between sm:justify-start gap-2 md:gap-4"
    >
      <button
        v-for="(filter, index) in filters"
        :key="filter.id"
        @click="galleryStore.filterProjects(filter.id)"
        :style="{
          '--entry-delay': `${index * 500}ms`,
          zIndex: 50 - index,
        }"
        class="filter-btn py-2 lg:py-3 flex-1 lg:px-6 xl:px-8 border border-black text-xs sm:text-sm cursor-pointer focus:outline-none focus-visible:outline-1 focus-visible:outline-black"
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
