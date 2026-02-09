<script setup lang="ts">
import FullscreenGallery from "~/components/singleProject/fullscreenGallery.vue";
import Gallery from "~/components/singleProject/gallery.vue";
import { useFetchSingle } from "~/composables/projects/useFetchSingle";
import { useFetchImages } from "~/composables/images/useFetchImages";
import { useScrollStore } from "~/stores/scroll";

const scrollStore = useScrollStore();

const route = useRoute();
const projectID = computed(() => Number(route.params.id) ?? 0);

const { projectData, projectRefresh } = useFetchSingle(projectID.value);
const { imagesList, imagesLoading, imagesRefresh } = useFetchImages(
  projectID.value,
);

useSeoMeta({
  title: () =>
    projectData.value ? `Agata Hann • ${projectData.value.name}` : "Agata Hann",
  description: () => $t("seo.projects.description"),
  keywords: () => $t("seo.projects.keywords"),
  ogTitle: () =>
    projectData.value ? `Agata Hann • ${projectData.value.name}` : "Agata Hann",
  ogDescription: () => $t("seo.projects.description"),
  ogImage: "https://hannwnetrza.pl/logo_white.png",
  ogUrl: "https://hannwnetrza.pl",
  ogType: "website",
});

definePageMeta({
  navbar: "compact",
});

onMounted(async () => {
  await projectRefresh();
  await imagesRefresh();
});

const fullscreenImage = ref<number | null>(null);

const displayImage = (id: number) => {
  fullscreenImage.value = id;
  activeIndex.value = id;
};

const isLocked = useScrollLock(
  typeof document !== "undefined" ? document.body : null,
);
watch(fullscreenImage, (val) => {
  isLocked.value = val !== null;
  scrollStore.hideScroll = val !== null;
});

const activeIndex = ref<number>(0);

const nextImage = () => {
  const totalImages = imagesList.value?.length ?? 0;

  if (activeIndex.value >= totalImages - 1) return;
  activeIndex.value++;
  fullscreenImage.value = activeIndex.value;
};

const previousImage = () => {
  if (activeIndex.value <= 0) return;
  activeIndex.value--;
  fullscreenImage.value = activeIndex.value;
};

onKeyStroke("ArrowRight", () => nextImage());
onKeyStroke("ArrowLeft", () => previousImage());
onKeyStroke("Escape", () => {
  fullscreenImage.value = null;
});
</script>

<template>
  <section class="flex-1 flex flex-col items-center pb-4">
    <Gallery
      v-if="projectData && imagesList"
      :data="projectData"
      :images="imagesList"
      :isLoading="imagesLoading"
      @showImage="displayImage"
    />
    <FullscreenGallery
      v-if="fullscreenImage !== null && imagesList"
      :image="imagesList[fullscreenImage].url"
      :hasPrevious="activeIndex > 0"
      :hasNext="activeIndex < imagesList.length - 1"
      @previous="previousImage"
      @next="nextImage"
      @close="fullscreenImage = null"
    />
  </section>
</template>
