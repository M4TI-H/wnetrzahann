<script setup lang="ts">
import FullscreenGallery from "~/components/singleProject/fullscreenGallery.vue";
import Gallery from "~/components/singleProject/gallery.vue";

const route = useRoute();
const projectName = computed(() => String(route.params.name ?? ""));

definePageMeta({
  navbar: "compact",
});

const images = [
  {
    id: 0,
    image: "/projectImages/1.jpg",
  },
  {
    id: 1,
    image: "/projectImages/2.jpg",
  },
  {
    id: 2,
    image: "/projectImages/3.jpg",
  },
  {
    id: 3,
    image: "/projectImages/4.jpg",
  },
  {
    id: 4,
    image: "/projectImages/5.jpg",
  },
];

const fullscreenImage = ref<number | null>(null);

const displayImage = (id: number) => {
  fullscreenImage.value = id;
  activeIndex.value = id;
};

const activeIndex = ref<number>(0);

const nextImage = () => {
  if (activeIndex.value === images.length - 1) return;
  activeIndex.value = activeIndex.value + 1;
  fullscreenImage.value = activeIndex.value;
};

const previousImage = () => {
  if (activeIndex.value === 0) return;
  activeIndex.value = activeIndex.value - 1;
  fullscreenImage.value = activeIndex.value;
};
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
    <Gallery :images="images" :name="projectName" @showImage="displayImage" />
    <FullscreenGallery
      v-if="fullscreenImage !== null"
      :image="images[fullscreenImage].image"
      :hasPrevious="activeIndex > 0"
      :hasNext="activeIndex < images.length - 1"
      @previous="previousImage"
      @next="nextImage"
      @close="fullscreenImage = null"
    />
  </section>
</template>
