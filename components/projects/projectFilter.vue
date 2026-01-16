<script setup lang="ts">
import SearchBar from "./searchBar.vue";

const galleryStore = useGalleryStore();
</script>
<template>
  <section
    class="w-full flex items-center justify-between flex-col-reverse sm:flex-row gap-4 md:gap-8 px-4 md:px-8"
  >
    <div
      class="w-full sm:w-1/2 min-w-48 flex items-center justify-between sm:justify-start gap-2 md:gap-4"
    >
      <button
        @click="galleryStore.filterProjects('wszystkie')"
        :class="
          galleryStore.filter === 'wszystkie'
            ? 'bg-neutral-800 hover:bg-black text-gray-100'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        "
        class="py-2 lg:py-3 flex-1 lg:px-6 xl:px-8 border border-black text-xs sm:text-sm cursor-pointer transition-colors duration-300 ease-in-out"
      >
        {{ $t("projects.filters.all") }}
      </button>
      <button
        @click="galleryStore.filterProjects('komercyjne')"
        :class="
          galleryStore.filter === 'komercyjne'
            ? 'bg-neutral-800 hover:bg-black text-gray-100'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        "
        class="py-2 lg:py-3 flex-1 lg:px-6 xl:px-8 border border-black text-xs sm:text-sm cursor-pointer transition-colors duration-300 ease-in-out"
      >
        {{ $t("projects.filters.commercial") }}
      </button>
      <button
        @click="galleryStore.filterProjects('prywatne')"
        :class="
          galleryStore.filter === 'prywatne'
            ? 'bg-neutral-800 hover:bg-black text-gray-100'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        "
        class="py-2 lg:py-3 flex-1 lg:px-6 xl:px-8 border border-black text-xs sm:text-sm cursor-pointer transition-colors duration-300 ease-in-out"
      >
        {{ $t("projects.filters.residential") }}
      </button>
    </div>

    <SearchBar />
  </section>
</template>
