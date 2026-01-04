<script setup lang="ts">
import FullscreenGallery from "~/components/singleProject/fullscreenGallery.vue";
import MobileGallery from "~/components/singleProject/mobileGallery.vue";

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
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
    <FullscreenGallery :images="images" :name="projectName" />
    <MobileGallery :images="images" :name="projectName" />
  </section>
</template>
