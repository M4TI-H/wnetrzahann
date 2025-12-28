<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import { useWindowScroll, useWindowSize } from "@vueuse/core";

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const { contactData } = useFetchContact();

const afterHero = computed(() => scrollY.value > windowHeight.value - 64);
</script>
<template>
  <div
    :class="[
      afterHero ? 'bg-gray-300 h-16' : 'bg-black/40 h-24 ',
      'z-50 fixed w-full flex items-center justify-between px-4 lg:px-8 py-2 transition-all duration-500 ease-in-out',
    ]"
  >
    <img
      draggable="false"
      :src="afterHero ? '/logo-white.png' : '/logo-white.png'"
      :class="[
        afterHero ? 'h-2/3 lg:h-3/4 opacity-100' : 'h-1/2 lg:h-3/4 opacity-0',
        ' transition-all duration-500 ease-in-out delay-50',
      ]"
    />

    <div class="h-full flex items-center gap-4 lg:gap-8">
      <NuxtLink
        :class="[
          afterHero
            ? 'hover:bg-black/10 active:bg-black/10 text-sm lg:text-base'
            : 'hover:bg-black/30 active:bg-black/30 text-sm lg:text-lg',
          'select-none px-2 py-1 text-white cursor-pointer transition-colors duration-300 ease-in-out',
        ]"
        >Projekty</NuxtLink
      >
      <NuxtLink
        :class="[
          afterHero
            ? 'hover:bg-black/10 active:bg-black/10 text-sm lg:text-base'
            : 'hover:bg-black/30 active:bg-black/30 text-sm lg:text-lg',
          'select-none px-2 py-1 text-white cursor-pointer transition-colors duration-300 ease-in-out',
        ]"
        >Kontakt</NuxtLink
      >
      <div class="hidden sm:flex w-px h-1/2 bg-white"></div>
      <NuxtLink
        target="_blanc"
        :to="contactData?.facebook_url"
        :class="[
          afterHero
            ? 'hover:bg-black/10 active:bg-black/10'
            : 'hover:bg-black/30 active:bg-black/30',
          'hidden sm:flex select-none p-1 cursor-pointer transition-colors duration-300 ease-in-out',
        ]"
        ><i class="pi pi-facebook text-xl text-white"></i
      ></NuxtLink>
      <NuxtLink
        target="_blanc"
        :to="contactData?.linkedin_url"
        :class="[
          afterHero
            ? 'hover:bg-black/10 active:bg-black/10'
            : 'hover:bg-black/30 active:bg-black/30',
          'hidden sm:flex select-none p-1 cursor-pointer transition-colors duration-300 ease-in-out',
        ]"
        ><i class="pi pi-linkedin text-xl text-white"></i
      ></NuxtLink>
    </div>
  </div>
</template>
