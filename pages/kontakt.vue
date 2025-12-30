<script setup lang="ts">
const { openContactForm } = useContactForm();
</script>

<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
  >
    <div
      class="absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center gap-8 bg-black/30"
    >
      <div
        class="w-full max-w-lg flex flex-col gap-8 bg-gray-100 border border-black p-8"
      >
        <h1 class="text-xl md:text-2xl font-semibold">Kontakt</h1>
        <div class="w-full flex items-center justify-around">
          <div class="flex items-center gap-2">
            <i class="pi pi-envelope text-lg"></i>
            <p>Email</p>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-phone text-lg"></i>
            <p>numer</p>
          </div>
        </div>
        <p class="mx-auto">lub</p>
        <button
          @click="openContactForm"
          class="w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-white border-2 border-white hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
        >
          Napisz wiadomość
        </button>
      </div>
    </div>
    <img
      src="/concept2.jpg"
      draggable="false"
      class="w-full h-full object-cover select-none"
    />
  </div>
</template>
