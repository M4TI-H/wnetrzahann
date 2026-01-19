<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import { useWindowScroll, useWindowSize } from "@vueuse/core";

const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const emit = defineEmits<{
  (e: "contact"): void;
}>();

const props = defineProps<{
  mode: "dynamic" | "base" | "compact";
}>();

const toggleLocale = () => {
  if (locale.value === "en") {
    setLocale("pl");
  } else {
    setLocale("en");
  }
};

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
      isCompact
        ? 'bg-gray-300 h-16'
        : 'bg-black/30 h-16 md:h-24 backdrop-blur-sm',
      'z-30 fixed w-full flex items-center justify-between px-4 lg:px-8 py-2 transition-all duration-500 ease-in-out',
    ]"
  >
    <NuxtLink
      :to="localePath('/')"
      class="h-1/2 lg:h-3/4 opacity-100 transition-all duration-500 ease-in-out delay-50 cursor-pointer select-none outline-0"
    >
      <img draggable="false" src="/logo-half.png" class="h-full select-none" />
    </NuxtLink>

    <div class="h-full flex items-center gap-2 sm:gap-4 lg:gap-8">
      <NuxtLink
        :to="localePath('/projekty')"
        :class="[
          isCompact
            ? 'hover:bg-black/10 active:bg-black/10 text-xs'
            : 'hover:bg-black/30 active:bg-black/30 text-xs md:text-sm',
          'select-none px-1 sm:px-2 py-1 text-white cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors duration-300 ease-in-out',
        ]"
        >{{ $t("nav.projects") }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/kontakt')"
        :class="[
          isCompact
            ? 'hover:bg-black/10 active:bg-black/10 text-xs'
            : 'hover:bg-black/30 active:bg-black/30 text-xs md:text-sm',
          'select-none px-1 sm:px-2 py-1 text-white cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors duration-300 ease-in-out',
        ]"
      >
        {{ $t("nav.contact") }}
      </NuxtLink>
      <div
        v-if="contactData"
        class="hidden sm:flex items-center gap-1 md:gap-2 h-full"
      >
        <div class="w-px h-1/2 bg-white mr-3 md:mr-5"></div>
        <NuxtLink
          target="_blanc"
          :to="contactData.facebook"
          :class="[
            isCompact
              ? 'hover:bg-black/10 active:bg-black/10 hidden sm:flex'
              : 'hover:bg-black/30 active:bg-black/30',
            'select-none px-1 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors duration-300 ease-in-out',
          ]"
          ><i class="pi pi-facebook sm:text-xl text-white"></i
        ></NuxtLink>
        <NuxtLink
          target="_blanc"
          :to="contactData.instagram"
          :class="[
            isCompact
              ? 'hover:bg-black/10 active:bg-black/10 hidden sm:flex'
              : 'hover:bg-black/30 active:bg-black/30',
            'select-none px-1 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors duration-300 ease-in-out',
          ]"
          ><i class="pi pi-instagram sm:text-xl text-white"></i
        ></NuxtLink>
        <NuxtLink
          target="_blanc"
          :to="contactData.linkedin"
          :class="[
            isCompact
              ? 'hover:bg-black/10 active:bg-black/10 hidden sm:flex'
              : 'hover:bg-black/30 active:bg-black/30',
            'select-none px-1 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors duration-300 ease-in-out',
          ]"
          ><i class="pi pi-linkedin sm:text-xl text-white"></i
        ></NuxtLink>
        <NuxtLink
          target="_blanc"
          :to="contactData.youtube"
          :class="[
            isCompact
              ? 'hover:bg-black/10 active:bg-black/10 hidden sm:flex'
              : 'hover:bg-black/30 active:bg-black/30',
            'select-none px-1 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors duration-300 ease-in-out',
          ]"
          ><i class="pi pi-youtube sm:text-xl text-white"></i
        ></NuxtLink>
      </div>
      <div class="flex items-center gap-1 md:gap-2 h-full">
        <div class="w-px h-1/2 bg-white mr-3 md:mr-5"></div>
        <button
          @click="toggleLocale"
          draggable="false"
          class="text-xs md:text-sm select-none px-1 sm:px-2 py-1 text-white focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-white cursor-pointer hover:bg-black/30 active:bg-black/30 transition-colors duration-300 ease-in-out"
        >
          {{ locale === "pl" ? "PL" : "EN" }}
        </button>
      </div>
    </div>
  </div>
</template>
