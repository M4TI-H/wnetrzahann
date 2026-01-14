<script setup lang="ts"></script>

<template>
  <div class="relative w-full sm:w-1/2 min-w-48">
    <input
      type="text"
      placeholder="Wyszukaj projekt"
      class="w-full text-sm lg:text-base py-2 lg:py-3 px-3 lg:px-4 border border-black outline-0"
    />
    <button
      class="absolute z-20 px-3 lg:px-4 h-full text-xs md:text-sm bg-neutral-800 hover:bg-black right-0 top-0 outline-0 transition-colors duration-300 ease-in-out"
    >
      <i class="pi pi-search text-white"></i>
    </button>
  </div>
</template>
