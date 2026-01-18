<script setup lang="ts">
const emit = defineEmits<{
  (e: "scrollDown"): void;
}>();

const localePath = useLocalePath();
</script>

<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
  >
    <div
      class="absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center gap-8 bg-black/30"
    >
      <NuxtImg
        src="/logo-white.png"
        class="h-32 lg:h-64 select-none"
        draggable="false"
        format="webp"
      />
      <NuxtLink
        :to="localePath('/projekty')"
        class="group py-1 lg:py-2 px-2 lg:px-4 flex gap-4 items-center border border-white text-white text-sm lg:text-base backdrop-blur-sm hover:backdrop-blur cursor-pointer transition-all duration-300 ease-in-out select-none"
        >{{ $t("hero.button") }}
        <i
          class="pi pi-arrow-right text-white transition-transform duration-500 group-hover:translate-x-1 select-none"
        ></i>
      </NuxtLink>

      <button
        @click.prevent="emit('scrollDown')"
        class="group absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl md:text-4xl flex items-center justify-center text-white hover:bg-black/20 p-1 transition-colors duration-300 ease-in-out"
      >
        <i
          class="pi pi-angle-down group-hover:translate-y-1 transition-transform duration-300"
        ></i>
      </button>
    </div>
    <img
      src="/concept.jpg"
      draggable="false"
      class="w-full h-full object-cover select-none"
    />
  </div>
</template>
