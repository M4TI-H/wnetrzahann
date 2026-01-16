<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import { useContactStore } from "~/stores/contact";

definePageMeta({
  navbar: "base",
});

const contactStore = useContactStore();
const { contactData, contactRefresh } = useFetchContact();
</script>

<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
  >
    <div
      class="absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center gap-8 bg-black/30 p-4"
    >
      <div
        class="w-full max-w-lg flex flex-col gap-4 md:gap-8 bg-gray-100 border border-black p-4 md:p-8 md:pb-4"
      >
        <h1 class="text-2xl md:text-3xl lg:text-4xl">Kontakt</h1>
        <div
          v-if="contactData"
          class="w-full flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-4 md:gap-8"
        >
          <div class="flex items-center gap-4">
            <i class="pi pi-envelope text-lg"></i>
            <p>{{ contactData.email }}</p>
          </div>
          <div class="flex items-center gap-4">
            <i class="pi pi-phone text-lg"></i>
            <p>{{ contactData.phone }}</p>
          </div>
        </div>
        <div class="px-2 flex items-start gap-4">
          <i class="pi pi-clock text-lg pt-1"></i>

          <div class="flex flex-col gap-2">
            <p>Pon-Pt<span class="ml-8">8.00 - 16.00</span></p>
            <p>Sob-Nd <span class="ml-6">Nieczynne</span></p>
          </div>
        </div>

        <p class="mx-auto text-gray-500">lub</p>
        <button
          @click="contactStore.openContactForm"
          class="w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-white border-2 border-white hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
        >
          Napisz wiadomość
        </button>
        <div class="flex items-center mx-auto gap-8">
          <NuxtLink
            v-if="contactData?.facebook"
            :to="contactData.facebook"
            target="_blanc"
            class="text-2xl md:text-3xl text-gray-500 hover:text-gray-600 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-facebook"></i>
          </NuxtLink>
          <NuxtLink
            v-if="contactData?.instagram"
            :to="contactData.instagram"
            target="_blanc"
            class="text-2xl md:text-3xl text-gray-500 hover:text-gray-600 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-instagram"></i>
          </NuxtLink>
          <NuxtLink
            v-if="contactData?.youtube"
            :to="contactData.youtube"
            target="_blanc"
            class="text-2xl md:text-3xl text-gray-500 hover:text-gray-600 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-youtube"></i>
          </NuxtLink>
          <NuxtLink
            v-if="contactData?.linkedin"
            :to="contactData.linkedin"
            target="_blanc"
            class="text-2xl md:text-3xl text-gray-500 hover:text-gray-600 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-linkedin"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
    <img
      src="/concept2.jpg"
      draggable="false"
      class="w-full h-full object-cover select-none"
    />
  </div>
</template>
