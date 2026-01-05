<script setup lang="ts">
const props = defineProps<{
  image: any;
  hasNext: boolean;
  hasPrevious: boolean;
}>();

const emit = defineEmits<{
  (e: "next"): void;
  (e: "previous"): void;
  (e: "close"): void;
}>();

const isImageHovered = ref<boolean>(false);
</script>
<template>
  <div
    @click.self="emit('close')"
    class="fixed z-40 w-full h-full bg-black/60 backdrop-blur-sm flex flex-col gap-2 items-center justify-center"
  >
    <div
      @mouseenter="isImageHovered = true"
      @mouseleave="isImageHovered = false"
      class="relative flex flex-col items-center h-auto overflow-hidden"
    >
      <img
        :src="image"
        class="w-auto h-auto max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
      />

      <button
        v-if="hasPrevious"
        @click="emit('previous')"
        :class="[isImageHovered ? 'opacity-100' : 'opacity-100 md:opacity-0']"
        class="absolute z-20 left-0 top-0 h-full bg-black/50 md:bg-black/30 hover:bg-black/50 w-8 md:w-12 transition-all duration-300 ease-in-out"
      >
        <i class="pi pi-chevron-left text-2xl text-gray-100"></i>
      </button>
      <button
        v-if="hasNext"
        @click="emit('next')"
        :class="[isImageHovered ? 'opacity-100' : 'opacity-100 md:opacity-0']"
        class="absolute z-20 right-0 top-0 h-full bg-black/50 md:bg-black/30 hover:bg-black/50 w-8 md:w-12 transition-all duration-300 ease-in-out"
      >
        <i class="pi pi-chevron-right text-2xl text-gray-100"></i>
      </button>
    </div>
    <button
      @click="emit('close')"
      class="px-4 py-2 text-sm text-gray-100 flex items-center gap-2 bg-black/50 md:bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in-out"
    >
      <i class="pi pi-arrow-down-left-and-arrow-up-right-to-center text-sm"></i>
      Zamknij
    </button>
  </div>
</template>
