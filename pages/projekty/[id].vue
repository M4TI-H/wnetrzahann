<script setup lang="ts">
import FullscreenGallery from "~/components/singleProject/fullscreenGallery.vue";
import Gallery from "~/components/singleProject/gallery.vue";
import { useFetchSingle } from "~/composables/projects/useFetchSingle";
import { useFetchImages } from "~/composables/images/useFetchImages";

const route = useRoute();
const projectID = computed(() => Number(route.params.id) ?? 0);

useSeoMeta({
  title: () => `Agata Hann | ${projectData.value?.name}`,
  description: () => $t("seo.projects.description"),
  keywords: () => $t("seo.projects.keywords"),
  ogTitle: () => `Agata Hann | ${projectData.value?.name}`,
  ogDescription: () => $t("seo.projects.description"),
  ogImage: "https://hannwnetrza.pl/logo_white.png",
  ogUrl: "https://hannwnetrza.pl",
  ogType: "website",
});

definePageMeta({
  navbar: "compact",
});

const { projectData, projectRefresh } = useFetchSingle(projectID.value);

const { imagesList, imagesLoading, imagesRefresh } = useFetchImages(
  projectID.value,
);

onMounted(async () => {
  await projectRefresh;
  await imagesRefresh();
});

const fullscreenImage = ref<number | null>(null);

const displayImage = (id: number) => {
  fullscreenImage.value = id;
  activeIndex.value = id;
};

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
