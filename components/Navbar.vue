<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import { useWindowScroll } from "@vueuse/core";

const { y: scrollY } = useWindowScroll();
const { contactData, contactLoading, contactError } = useFetchContact();
</script>
<template>
  <div
    :class="[
      scrollY > 50 ? 'bg-gray-700 h-16' : 'bg-gray-300 h-24 lg:h-32 ',
      'fixed w-full flex items-center justify-between px-4 lg:px-8 py-2 transition-all duration-500 ease-in-out',
    ]"
  >
    <img
      :src="scrollY > 50 ? '/logo-white.png' : ''"
      :class="[
        scrollY > 50 ? 'h-2/3 lg:h-3/4' : 'h-1/2 lg:h-3/4',
        'transition-all duration-500 ease-in-out',
      ]"
    />

    <div class="h-full flex items-center gap-4 lg:gap-8">
      <NuxtLink
        class="px-2 py-1 text-sm lg:text-base text-white cursor-pointer rounded-lg hover:text-stone-200 hover:bg-black/10 active:bg-black/10"
        >Projekty</NuxtLink
      >
      <NuxtLink
        class="px-2 py-1 text-sm lg:text-base text-white cursor-pointer rounded-lg hover:text-stone-200 hover:bg-black/10 active:bg-black/10"
        >Kontakt</NuxtLink
      >
      <div class="hidden sm:flex w-px h-1/2 bg-white"></div>
      <NuxtLink
        :to="contactData?.facebook_url"
        class="p-1 hidden sm:flex cursor-pointer rounded-full hover:text-stone-200 hover:bg-black/10 active:bg-black/10"
        ><i class="pi pi-facebook text-xl text-white"></i
      ></NuxtLink>
      <NuxtLink
        :to="contactData?.linkedin_url"
        class="p-1 hidden sm:flex cursor-pointer rounded-full hover:text-stone-200 hover:bg-black/10 active:bg-black/10"
        ><i class="pi pi-linkedin text-xl text-white"></i
      ></NuxtLink>
    </div>
  </div>
</template>
