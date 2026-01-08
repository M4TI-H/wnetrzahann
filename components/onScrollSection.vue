<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import { useContactStore } from "~/stores/contact";
const { y: scrollY } = useWindowScroll();

const contactStore = useContactStore();

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

const handleScroll = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  <div class="z-50 fixed bottom-4 right-4 flex flex-col items-end gap-4">
    <button
      @click="contactStore.openContactForm"
      class="group h-10 lg:h-14 flex items-center bg-gray-100 active:bg-gray-200 hover:bg-gray-200 border border-black cursor-pointer transition-all duration-500 ease-in-out overflow-hidden"
      :class="[
        displayBtn
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none',
        'w-10 lg:w-14 hover:w-48 lg:hover:w-56',
      ]"
    >
      <div class="flex items-center h-full w-full">
        <div
          class="size-10 lg:size-14 shrink-0 flex items-center justify-center"
        >
          <i class="pi pi-envelope lg:text-lg text-black" />
        </div>

        <span
          class="whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium text-sm lg:text-base pr-4"
        >
          Napisz wiadomość
        </span>
      </div>
    </button>

    <button
      @click="handleScroll"
      class="size-10 lg:size-14 flex items-center justify-center bg-gray-100 active:bg-gray-200 hover:bg-gray-200 border border-black cursor-pointer transition-all duration-300 ease-in-out"
      :class="[
        displayBtn
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none',
      ]"
    >
      <i
        class="pi pi-arrow-up lg:text-lg text-black transition-transform duration-300 hover:-translate-y-1"
      />
    </button>
  </div>
</template>
