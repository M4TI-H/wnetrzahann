<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
const { y: scrollY } = useWindowScroll();

const displayBtn = ref<boolean>(false);
let calculatePositionFlag: boolean = false;

const onScroll = () => {
  if (!calculatePositionFlag) {
    requestAnimationFrame(() => {
      displayBtn.value = scrollY.value > 100;
      calculatePositionFlag = false;
    });
    calculatePositionFlag = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
<template>
  <button
    class="group z-50 fixed bottom-4 right-4 size-10 lg:size-14 flex items-center justify-center bg-gray-100 active:bg-gray-200 hover:bg-gray-200 border border-black cursor-pointer transition-all duration-300 ease-in-out"
    :class="[
      displayBtn
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10 pointer-events-none',
    ]"
  >
    <i
      class="pi pi-envelope lg:text-lg text-black transition-transform duration-300 group-hover:-translate-y-1"
    />
  </button>
</template>
