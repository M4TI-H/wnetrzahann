<script setup lang="ts"></script>

<template>
  <div class="relative w-full max-w-[90%] md:w-2/3 xl:w-1/2">
    <input
      type="text"
      placeholder="Wyszukaj projekt"
      class="w-full text-sm md:text-base p-3 md:p-4 border border-black outline-0"
    />
    <button
      class="absolute z-20 px-5 h-full bg-neutral-800 hover:bg-black right-0 top-0 outline-0 transition-colors duration-300 ease-in-out"
    >
      <i class="pi pi-search text-white"></i>
    </button>
  </div>
</template>
