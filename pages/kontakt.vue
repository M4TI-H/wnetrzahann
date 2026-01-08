<script setup lang="ts">
import { useContactStore } from "~/stores/contact";

definePageMeta({
  navbar: "base",
});

const contactStore = useContactStore();
</script>

<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
  >
    <div
      class="absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center gap-8 bg-black/30 p-4"
    >
      <div
        class="w-full max-w-lg flex flex-col gap-8 bg-gray-100 border border-black p-8"
      >
        <h1 class="text-xl md:text-2xl lg:text-3xl">Kontakt</h1>
        <div
          class="w-full flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-8"
        >
          <div class="flex items-center gap-4">
            <i class="pi pi-envelope text-lg"></i>
            <p>hannwnetrza@gmail.com</p>
          </div>
          <div class="flex items-center gap-4">
            <i class="pi pi-phone text-lg"></i>
            <p>+48 607 255 362</p>
          </div>
        </div>
        <div class="px-2 flex items-start gap-4">
          <i class="pi pi-clock text-lg pt-1"></i>

          <div class="flex flex-col">
            <p class="">Pon-Pt<span class="ml-8">8.00 - 16.00</span></p>
            <p>Sob-Nd <span class="ml-6">Nieczynne</span></p>
          </div>
        </div>

        <p class="mx-auto">lub</p>
        <button
          @click="contactStore.openContactForm"
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
