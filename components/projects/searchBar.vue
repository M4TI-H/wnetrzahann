<script setup lang="ts">
const galleryStore = useGalleryStore();
const search = ref<string>("");
const isMounted = ref<boolean>();

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 50);
});
const handleSearch = () => {
  galleryStore.setSearch(search.value);
};
</script>

<template>
  <div
    :style="{
      transitionDelay: isMounted ? '1200ms' : '0ms',
      zIndex: 5,
    }"
    class="relative w-full xl:w-1/2 min-w-48 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[transform,opacity]"
    :class="[
      isMounted ? 'translate-x-0 opacity-100' : 'translate-x-1/2 opacity-0',
    ]"
  >
    <input
      v-model="search"
      @keyup.enter="handleSearch"
      type="text"
      :placeholder="$t('projects.search')"
      class="w-full text-xs sm:text-sm py-3 px-3 lg:px-4 border rounded-none border-black focus:outline-none bg-gray-100"
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

<style scoped>
div {
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
