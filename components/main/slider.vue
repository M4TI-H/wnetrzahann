<script setup lang="ts">
import { useFetchGalleryProjects } from "~/composables/gallery/useFetchGalleryProjects";

const { projectsData, projectsLoading, projectsRefresh } =
  useFetchGalleryProjects({
    getCategory: () => "all",
    getSearch: () => "",
    getLimit: () => projectsDisplayed,
  });

const idCounter = ref<number>(0);
const isPaused = ref<boolean>(false);
const sliderDuration = 5000;
const projectsDisplayed = 5;
const direction = ref<"next" | "prev">("next");

const sliderRef = ref<HTMLElement | null>(null);
const isVisible = ref<boolean>(false);

const prevID = () => {
  direction.value = "prev";
  idCounter.value =
    (idCounter.value - 1 + projectsData.value.length) %
    projectsData.value.length;
};

const nextID = () => {
  direction.value = "next";
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
    if (!isPaused.value && projectsData.value.length > 0) {
      nextID();
    }
  }, sliderDuration);
});

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    { threshold: 0.2, rootMargin: "0px 0px -250px 0px" },
  );

  if (sliderRef.value) {
    observer.observe(sliderRef.value);
  }
});
</script>
<template>
  <section ref="sliderRef" class="w-full flex flex-col gap-4 overflow-x-hidden">
    <div
      v-if="projectsData && projectsData.length > 0"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      class="relative w-full h-[92vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <Transition :name="direction === 'next' ? 'slide-next' : 'slide-prev'">
        <NuxtImg
          :key="idCounter"
          :alt="`${projectsData[idCounter].name} image`"
          :src="projectsData[idCounter].cover"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </Transition>

      <div
        class="hidden sm:flex absolute z-20 flex-col items-end top-20 right-4 max-w-xs bg-black/20 backdrop-blur-sm py-2 px-4 transition-all duration-1000 ease-out"
        :class="
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-[120%] opacity-0'
        "
      >
        <p class="text-white/80">
          Z pasją projektuję wnętrza, które łączą estetykę z codzienną
          funkcjonalnością. Z wieloletnim doświadczeniem w sektorze prywatnym i
          komercyjnym, tworzę przestrzenie skrojone pod indywidualne potrzeby
          inwestorów.
          <br />
          Zachęcam do obejrzenia wybranych projektów i kontaktu.
        </p>
        <h1 class="text-xl text-white/80">Agata Hann</h1>
      </div>

      <div
        v-if="projectsData"
        class="opacity-100 absolute z-10 bottom-0 w-full h-full flex flex-col justify-end p-2 sm:p-4 lg:p-8 bg-linear-to-b from-transparent to-black/50 transition-opacity duration-300 ease-in-out"
      >
        <p class="text-sm text-white/80 uppercase tracking-widest">
          {{
            projectsData[idCounter].category === "commercial"
              ? $t("projects.category.commercial")
              : $t("projects.category.residential")
          }}
        </p>
        <p class="text-3xl text-white font-bold">
          {{ projectsData[idCounter].name.toUpperCase() }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.8s ease-in-out;
}

.slide-next-enter-from {
  transform: translateX(100%);
}
.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  transform: translateX(100%);
}

.absolute {
  position: absolute;
}
</style>
