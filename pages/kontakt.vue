<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import { useContactStore } from "~/stores/contact";

useSeoMeta({
  title: () => $t("seo.contact.title"),
  description: () => $t("seo.contact.description"),
  keywords: () => $t("seo.contact.keywords"),
  ogTitle: () => $t("seo.contact.title"),
  ogDescription: () => $t("seo.contact.description"),
  ogImage: "https://hannwnetrza.pl/logo_white.png",
  ogUrl: "https://hannwnetrza.pl",
  ogType: "website",
});

definePageMeta({
  navbar: "base",
});

const contactStore = useContactStore();
const { contactData, contactRefresh } = useFetchContact();

onMounted(async () => {
  await contactRefresh();
});
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
        <h1 class="text-2xl md:text-3xl lg:text-4xl">
          {{ $t("contact.title") }}
        </h1>
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

          <div class="w-full flex flex-col gap-2">
            <div class="w-full flex items-center justify-between">
              <p>{{ $t("contact.monFri") }}</p>
              <p>{{ $t("contact.monFriHours") }}</p>
            </div>

            <div class="w-full flex items-center justify-between">
              <p>{{ $t("contact.satSun") }}</p>
              <p>{{ $t("contact.satSunHours") }}</p>
            </div>
          </div>
        </div>

        <p class="mx-auto text-gray-500">
          {{ $t("scrollSection.openContact") }}
        </p>
        <button
          @click="contactStore.openContactForm"
          class="w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-white border-2 border-white hover:border-black ring-2 ring-black outline-0 focus:border-black focus:bg-black font-semibold transition-colors duration-300 ease-in-out"
        >
          {{ $t("contact.cta") }}
        </button>
        <div class="flex items-center mx-auto gap-8">
          <NuxtLink
            v-if="contactData?.facebook"
            :to="contactData.facebook"
            aria-label="facebook"
            target="_blanc"
            class="text-md md:text-2xl text-gray-500 hover:text-gray-600 focus:text-gray-600 outline-0 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-facebook"></i>
          </NuxtLink>
          <NuxtLink
            v-if="contactData?.instagram"
            :to="contactData.instagram"
            aria-label="instagram"
            target="_blanc"
            class="text-lg md:text-2xl text-gray-500 hover:text-gray-600 focus:text-gray-600 outline-0 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-instagram"></i>
          </NuxtLink>
          <NuxtLink
            v-if="contactData?.youtube"
            :to="contactData.youtube"
            aria-label="youtube"
            target="_blanc"
            class="text-lg md:text-2xl text-gray-500 hover:text-gray-600 focus:text-gray-600 outline-0 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-youtube"></i>
          </NuxtLink>
          <NuxtLink
            v-if="contactData?.linkedin"
            :to="contactData.linkedin"
            aria-label="linkedin"
            target="_blanc"
            class="text-lg md:text-2xl text-gray-500 hover:text-gray-600 focus:text-gray-600 outline-0 transition-colors duration-300 ease-in-out"
          >
            <i class="pi pi-linkedin"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
    <NuxtImg
      src="/concept2.jpg"
      draggable="false"
      class="w-full h-full object-cover select-none"
    />
  </div>
</template>
