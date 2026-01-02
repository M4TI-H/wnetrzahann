<script setup lang="ts">
// const props = defineProps<{
//   currentPage?: number;
// }>();
const emit = defineEmits<{
  (e: "page", value: number): void;
}>();

const currentPage = 1;

const numOfPages = 8;
</script>

<template>
  <div class="h-12 flex items-center gap-2 px-2">
    <button
      v-for="page in 3"
      :key="page"
      :class="[
        page === currentPage ? 'bg-black/20' : 'bg-gray-100 hover:bg-black/10',
      ]"
      class="size-8 border border-black text-sm transition-colors duration-200 ease-in-out"
    >
      {{ page }}
    </button>
    <p>...</p>
    <button class="size-8 border border-black text-sm hover:bg-black/10">
      {{ numOfPages }}
    </button>
  </div>
</template>
