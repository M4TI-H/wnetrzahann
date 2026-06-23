<script setup lang="ts">
import type GalleryImage from "~/models/GalleryImage";
import type Project from "~/models/Project";

const props = defineProps<{
  images: GalleryImage[];
  isLoading: boolean;
  data: Project;
}>();

const emit = defineEmits<{
  (e: "showImage", id: number): void;
}>();

const localePath = useLocalePath();

const vObserve = {
  mounted: (el: HTMLElement) => {
    el.classList.add("opacity-0", "translate-y-24");
    el.classList.add("transition-all", "duration-500", "ease-out");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-24");
            el.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "0px 0px -1% 0px",
        threshold: 0.05,
      },
    );

    observer.observe(el);
  },
};
</script>
<template>
  <div
    class="relative w-full md:w-2/3 min-h-screen flex flex-col gap-6 md:gap-10 pt-20 md:pt-24 pb-4 px-4 mx-auto"
  >
    <!-- GŁÓWNY HEADER (Zastępuje wszystkie stare divy z absolute) -->
    <header class="w-full">
      <!-- WERSJA DESKTOP (od 'md' wzwyż): Grid 3-kolumnowy -->
      <div class="hidden md:grid grid-cols-3 items-start gap-4">
        <!-- Lewa kolumna: Przycisk -->
        <div class="flex justify-start">
          <NuxtLink
            :to="localePath('/projekty')"
            class="group flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out w-max"
          >
            <i
              class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
            ></i>
            {{ $t("projects.backBtn") }}
          </NuxtLink>
        </div>

        <div class="flex justify-center text-center">
          <h1
            class="text-3xl lg:text-4xl font-semibold wrap-break-words hyphens-auto"
          >
            {{ props.data.name }}
          </h1>
        </div>

        <div class="flex flex-col items-end gap-1.5 text-sm text-gray-500">
          <p class="font-medium text-black uppercase tracking-wider text-xs">
            {{
              props.data.category === "commercial"
                ? $t("projects.category.commercial")
                : $t("projects.category.residential")
            }}
          </p>
          <div class="flex items-center gap-2">
            <i class="pi pi-clock"></i>
            <p>
              {{
                new Date(props.data.creation_date).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></i>
            <p>{{ props.data.area }} m&sup2;</p>
          </div>
        </div>
      </div>

      <div class="flex md:hidden flex-col gap-4">
        <NuxtLink
          :to="localePath('/projekty')"
          class="group w-max flex items-center gap-2 p-2 text-xs bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out"
        >
          <i
            class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
          ></i>
          {{ $t("projects.backBtn") }}
        </NuxtLink>

        <h1
          class="text-3xl font-semibold leading-tight wrap-break-words hyphens-auto"
        >
          {{ props.data.name }}
        </h1>

        <div class="flex flex-wrap items-center gap-3 text-xs text-gray-600">
          <div
            class="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-sm"
          >
            <span class="font-medium uppercase tracking-wider text-[10px]">
              {{
                props.data.category === "commercial"
                  ? $t("projects.category.commercial")
                  : $t("projects.category.residential")
              }}
            </span>
          </div>

          <div class="flex items-center gap-1.5">
            <i class="pi pi-clock text-[10px]"></i>
            <p>
              {{
                new Date(props.data.creation_date).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              }}
            </p>
          </div>

          <div class="flex items-center gap-1.5">
            <i
              class="pi pi-arrow-up-right-and-arrow-down-left-from-center text-[10px]"
            ></i>
            <p>{{ props.data.area }} m&sup2;</p>
          </div>
        </div>
      </div>
    </header>

    <div
      v-if="images"
      class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8 w-full mx-auto overflow-hidden"
    >
      <div
        v-observe
        v-for="(image, idx) in images"
        @click="emit('showImage', images[idx].id)"
        :key="idx"
        class="relative overflow-hidden cursor-pointer"
        :class="[
          Number(idx) % 3 === 0 ||
          (idx === images.length - 1 && images.length % 3 === 2)
            ? 'col-span-2 h-auto'
            : 'col-span-1 h-32 md:h-80',
        ]"
      >
        <NuxtImg
          :src="image.url"
          :alt="`${idx} image`"
          draggable="false"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <i v-if="isLoading" class="pi pi-spinner pi-spin self-center mt-4"></i>
  </div>
</template>
