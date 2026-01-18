<script setup lang="ts">
import { useFetchGalleryProjects } from "~/composables/gallery/useFetchGalleryProjects";

const { projectsData, projectsLoading, projectsRefresh } =
  useFetchGalleryProjects({
    getCategory: () => "all",
    getSearch: () => "",
    getLimit: () => projectsDisplayed,
  });

const idCounter = ref<number>(0);
const isHovered = ref<boolean>(false);
const isPaused = ref<boolean>(false);
const sliderDuration = 5000;
const projectsDisplayed = 5;

const prevID = () => {
  idCounter.value =
    (idCounter.value - 1 + projectsData.value.length) %
    projectsData.value.length;
};

const nextID = () => {
  idCounter.value = (idCounter.value + 1) % projectsData.value.length;
};

const touchStartX = ref<number>(0);
const touchEndX = ref<number>(0);

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].clientX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].clientX;
  handleSwipe();
};

const handleSwipe = () => {
  const diff = touchStartX.value - touchEndX.value;

  if (Math.abs(diff) < 100) return;

  if (diff > 0) nextID();
  else prevID();
};

onMounted(async () => {
  await projectsRefresh();
  setInterval(() => {
    if (!isHovered.value && !isPaused.value && projectsData.value.length > 0) {
      nextID();
    }
  }, sliderDuration);
});
</script>
<template>
  <section class="flex flex-col items-center justify-center">
    <div
      v-if="projectsData && projectsData.length > 0"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      class="relative max-w-[80rem] h-[32rem] md:h-[42rem] flex flex-col items-center justify-center overflow-hidden"
    >
      <Transition name="fade" mode="out-in">
        <NuxtImg
          :src="projectsData[idCounter].cover"
          :style="{
            animationDuration: `${sliderDuration}ms`,
          }"
          class="w-full h-full object-cover"
          :class="idCounter % 2 === 0 ? 'slider-zoom-in' : 'slider-zoom-out'"
          loading="lazy"
        />
      </Transition>

      <div
        class="absolute z-20 top-2 right-2 flex items-center gap-2 p-1 pr-2 bg-black/50"
      >
        <button @click="isPaused = !isPaused" class="px-1">
          <i
            :class="[
              isPaused ? 'pi-play' : 'pi-pause',
              'pi text-white translate-y-0.5 outline-0',
            ]"
          ></i>
        </button>
        <button
          @click="idCounter = idx"
          v-for="(item, idx) in projectsData"
          :key="idx"
          :class="[
            idx === idCounter ? 'bg-white' : 'bg-none hover:bg-gray-300',
            'size-4 md:size-2 border border-white cursor-hover transition-colors duration-150 ease-in-out outline-0',
          ]"
        ></button>
      </div>
      <div
        v-if="projectsData"
        class="opacity-100 hover:opacity-0 absolute z-10 bottom-0 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-b from-transparent to-black/50 transition-opacity duration-300 ease-in-out"
      >
        <p class="text-sm text-white">
          {{
            projectsData[idCounter].category === "commercial"
              ? $t("projects.category.commercial")
              : $t("projects.category.residential")
          }}
        </p>
        <p class="text-xl text-white font-semibold">
          {{ projectsData[idCounter].name.toUpperCase() }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slider-zoom-in {
  animation-name: sliderZoomIn;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes sliderZoomIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.slider-zoom-out {
  animation-name: sliderZoomOut;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}

@keyframes sliderZoomOut {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
</style>
