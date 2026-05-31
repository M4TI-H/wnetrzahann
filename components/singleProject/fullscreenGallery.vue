<script setup lang="ts">
const props = defineProps<{
  image: string;
  hasNext: boolean;
  hasPrevious: boolean;
}>();

const emit = defineEmits<{
  (e: "next"): void;
  (e: "previous"): void;
  (e: "close"): void;
}>();

const isImageHovered = ref<boolean>(false);
const isClosedByBackButton = ref<boolean>(false);

const imgAspect = ref<number | null>(null);

const onImgLoad = (e: Event) => {
  const target = e.target as HTMLImageElement;
  if (target.naturalWidth && target.naturalHeight) {
    imgAspect.value = target.naturalWidth / target.naturalHeight;
  }
};

watch(
  () => props.image,
  () => {
    imgAspect.value = null;
  },
);

const handlePopState = () => {
  isClosedByBackButton.value = true;
  emit("close");
};

onMounted(() => {
  window.history.pushState({ galleryModal: true }, "");
  window.addEventListener("popstate", handlePopState);
});

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState);

  if (!isClosedByBackButton.value) {
    window.history.back();
  }
});
</script>

<template>
  <div
    @click.self="emit('close')"
    class="fixed z-40 w-full h-full p-2 bg-black/60 backdrop-blur-sm flex flex-col gap-2 items-center justify-center"
  >
    <div
      @mouseenter="isImageHovered = true"
      @mouseleave="isImageHovered = false"
      class="relative inline-flex items-center justify-center transition-all duration-300 ease-out"
      :style="
        imgAspect
          ? {
              width: `min(90vw, 1920px, calc(min(90vh, 1080px) * ${imgAspect}))`,
              height: `min(90vh, 1080px, calc(min(90vw, 1920px) / ${imgAspect}))`,
            }
          : {}
      "
    >
      <NuxtImg
        :src="image"
        alt="Fullscreen image"
        loading="lazy"
        draggable="false"
        @load="onImgLoad"
        class="w-full h-full max-w-[90vw] max-h-[90vh] object-contain drop-shadow-2xl transition-opacity duration-300"
      />

      <button
        v-if="hasPrevious"
        :aria-label="$t('projects.previous')"
        @click="emit('previous')"
        :class="[isImageHovered ? 'opacity-100' : 'opacity-100 md:opacity-0']"
        class="absolute z-20 left-0 top-0 h-full w-10 md:top-1/2 md:-translate-y-1/2 md:h-12 md:w-12 flex items-center justify-center bg-black/50 md:bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <i class="pi pi-chevron-left text-xl md:text-2xl text-gray-100"></i>
      </button>
      <button
        v-if="hasNext"
        :aria-label="$t('projects.next')"
        @click="emit('next')"
        :class="[isImageHovered ? 'opacity-100' : 'opacity-100 md:opacity-0']"
        class="absolute z-20 right-0 top-0 h-full w-10 md:top-1/2 md:-translate-y-1/2 md:h-12 md:w-12 flex items-center justify-center bg-black/50 md:bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <i class="pi pi-chevron-right text-xl md:text-2xl text-gray-100"></i>
      </button>
    </div>

    <button
      @click="emit('close')"
      class="hidden md:flex px-4 py-2 text-sm text-gray-100 items-center gap-2 bg-black/50 md:bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <i class="pi pi-arrow-down-left-and-arrow-up-right-to-center text-sm"></i>
      {{ $t("projects.closeBtn") }}
    </button>
  </div>
</template>
