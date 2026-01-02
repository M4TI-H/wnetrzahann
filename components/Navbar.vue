<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import { useWindowScroll, useWindowSize } from "@vueuse/core";

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const emit = defineEmits<{
  (e: "contact"): void;
}>();

const props = defineProps<{
  mode: "dynamic" | "base" | "compact";
}>();

const { contactData } = useFetchContact();

const isCompact = computed(() => {
  if (props.mode === "compact") return true;
  if (props.mode === "base") return false;
  return scrollY.value > windowHeight.value - 64;
});
</script>
<template>
  <div
    :class="[
      isCompact ? 'bg-gray-300 h-16' : 'bg-black/40 h-24',
      'z-50 fixed w-full flex items-center justify-between px-4 lg:px-8 py-2 transition-all duration-500 ease-in-out',
    ]"
  >
    <NuxtLink
      to="/"
      class="h-2/3 lg:h-3/4 opacity-100 transition-all duration-500 ease-in-out delay-50 cursor-pointer select-none"
    >
      <img
        draggable="false"
        :src="isCompact ? '/logo-white.png' : '/logo-white.png'"
        class="h-full select-none"
      />
    </NuxtLink>

    <div class="h-full flex items-center gap-2 sm:gap-4 lg:gap-8">
      <NuxtLink
        to="/projekty"
        :class="[
          isCompact
            ? 'hover:bg-black/10 active:bg-black/10 text-sm lg:text-base'
            : 'hover:bg-black/30 active:bg-black/30 text-sm lg:text-lg',
          'select-none px-1 sm:px-2 py-1 text-white cursor-pointer outline-0 transition-colors duration-300 ease-in-out',
        ]"
        >Projekty</NuxtLink
      >
      <NuxtLink
        to="/kontakt"
        :class="[
          isCompact
            ? 'hover:bg-black/10 active:bg-black/10 text-sm lg:text-base'
            : 'hover:bg-black/30 active:bg-black/30 text-sm lg:text-lg',
          'select-none px-1 sm:px-2 py-1 text-white cursor-pointer outline-0 transition-colors duration-300 ease-in-out',
        ]"
      >
        Kontakt
      </NuxtLink>
      <div class="hidden sm:flex w-px h-1/2 bg-white"></div>
      <NuxtLink
        target="_blanc"
        :to="contactData?.facebook_url"
        :class="[
          isCompact
            ? 'hover:bg-black/10 active:bg-black/10 hidden sm:flex'
            : 'hover:bg-black/30 active:bg-black/30',
          'select-none p-2 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out',
        ]"
        ><i class="pi pi-facebook sm:text-xl text-white"></i
      ></NuxtLink>
      <NuxtLink
        target="_blanc"
        :to="contactData?.linkedin_url"
        :class="[
          isCompact
            ? 'hover:bg-black/10 active:bg-black/10 hidden sm:flex'
            : 'hover:bg-black/30 active:bg-black/30',
          'select-none p-2 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out',
        ]"
        ><i class="pi pi-linkedin sm:text-xl text-white"></i
      ></NuxtLink>
    </div>
  </div>
</template>
