<script setup lang="ts">
const galleryStore = useGalleryStore();
const search = ref<string>("");

const handleSearch = () => {
  galleryStore.setSearch(search.value);
};
</script>

<template>
  <div class="relative w-full sm:w-1/2 min-w-48">
    <input
      v-model="search"
      @keyup.enter="handleSearch"
      type="text"
      :placeholder="$t('projects.search')"
      class="w-full text-sm lg:text-base py-2 lg:py-3 px-3 lg:px-4 border rounded-none border-black"
    />
    <button
      :aria-label="$t('projects.filters.search')"
      @click="handleSearch"
      class="absolute z-20 px-3 lg:px-4 h-full text-xs md:text-sm bg-neutral-800 hover:bg-black right-0 top-0 outline-none focus-visible:bg-black transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <i class="pi pi-search text-white"></i>
    </button>
  </div>
</template>
