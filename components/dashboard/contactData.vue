<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
const { contactData } = useFetchContact();

onMounted;
</script>

<template>
  <section class="w-1/3 p-4 border border-black flex flex-col gap-4 bg-white">
    <h2 class="text-2xl">Dane kontaktowe</h2>
    <template v-if="contactData">
      <div class="flex flex-col">
        <div
          class="w-fit flex items-center gap-2 px-2 py-1 border-x border-t border-black"
        >
          <i class="pi pi-envelope"></i>
          <p class="text-sm">Adres email</p>
        </div>
        <div
          class="w-full flex items-center justify-between border border-gray-500"
        >
          <p class="italic truncate py-2 px-4">
            {{ contactData.email }}
          </p>
          <button
            class="text-xs text-gray-500 p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-pen-to-square text-gray-100"></i>
          </button>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="w-fit flex items-center gap-2 px-2 py-1 border-x border-t border-black"
        >
          <i class="pi pi-phone"></i>
          <p class="text-sm">Numer telefonu</p>
        </div>
        <div
          class="w-full flex items-center justify-between border border-gray-500"
        >
          <p class="italic truncate py-2 px-4">
            {{ contactData.phone }}
          </p>
          <button
            class="text-xs text-gray-500 p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-pen-to-square text-gray-100"></i>
          </button>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="w-fit flex items-center gap-2 px-2 py-1 border-x border-t border-black"
        >
          <i class="pi pi-facebook"></i>
          <p class="text-sm">Facebook</p>
        </div>
        <div
          class="w-full flex items-center justify-between border border-gray-500"
        >
          <p class="italic truncate py-2 px-4">
            {{ contactData.facebook }}
          </p>
          <button
            class="text-xs text-gray-500 p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-pen-to-square text-gray-100"></i>
          </button>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="w-fit flex items-center gap-2 px-2 py-1 border-x border-t border-black"
        >
          <i class="pi pi-instagram"></i>
          <p class="text-sm">Instagram</p>
        </div>
        <div
          class="w-full flex items-center justify-between border border-gray-500"
        >
          <p class="italic truncate py-2 px-4">
            {{ contactData.instagram }}
          </p>
          <button
            class="text-xs text-gray-500 p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-pen-to-square text-gray-100"></i>
          </button>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="w-fit flex items-center gap-2 px-2 py-1 border-x border-t border-black"
        >
          <i class="pi pi-linkedin"></i>
          <p class="text-sm">LinkedIn</p>
        </div>
        <div
          class="w-full flex items-center justify-between border border-gray-500"
        >
          <p class="italic truncate py-2 px-4">
            {{ contactData.linkedin }}
          </p>
          <button
            class="text-xs text-gray-500 p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-pen-to-square text-gray-100"></i>
          </button>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="w-fit flex items-center gap-2 px-2 py-1 border-x border-t border-black"
        >
          <i class="pi pi-youtube"></i>
          <p class="text-sm">Youtube</p>
        </div>
        <div
          class="w-full flex items-center justify-between border border-gray-500"
        >
          <p class="italic truncate py-2 px-4">
            {{ contactData.youtube }}
          </p>
          <button
            class="text-xs text-gray-500 p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-pen-to-square text-gray-100"></i>
          </button>
        </div>
      </div>
    </template>
  </section>
</template>
