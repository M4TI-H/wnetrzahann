<script setup lang="ts">
const selectedFilter = ref<string>("all");
</script>
<template>
  <section
    class="w-full max-w-[90%] md:w-2/3 lg:w-2/5 flex items-center justify-center gap-2 sm:gap-6 md:gap-12 lg:gap-16"
  >
    <button
      @click="selectedFilter = 'all'"
      :class="
        selectedFilter === 'all'
          ? 'bg-neutral-800 hover:bg-black text-gray-100'
          : 'bg-gray-100 text-black hover:bg-gray-200'
      "
      class="py-2 md:py-3 flex-1 border border-black text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out"
    >
      WSZYSTKIE
    </button>
    <button
      @click="selectedFilter = 'commercial'"
      :class="
        selectedFilter === 'commercial'
          ? 'bg-neutral-800 hover:bg-black text-gray-100'
          : 'bg-gray-100 text-black hover:bg-gray-200'
      "
      class="py-2 md:py-3 flex-1 border border-black text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out"
    >
      KOMERCYJNE
    </button>
    <button
      @click="selectedFilter = 'private'"
      :class="
        selectedFilter === 'private'
          ? 'bg-neutral-800 hover:bg-black text-gray-100'
          : 'bg-gray-100 text-black hover:bg-gray-200'
      "
      class="py-2 md:py-3 flex-1 border border-black text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out"
    >
      PRYWATNE
    </button>
  </section>
</template>
