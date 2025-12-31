<script setup lang="ts">
const emit = defineEmits<{
  (e: "page", value: number): void;
}>();

const numOfPages = 8;
</script>

<template>
  <div class="h-12 flex items-center gap-2 px-2">
    <button
      v-for="page in 3"
      :key="page"
      class="size-8 border border-black text-sm hover:bg-black/10"
    >
      {{ page }}
    </button>
    <p>...</p>
    <button class="size-8 border border-black text-sm hover:bg-black/10">
      {{ numOfPages }}
    </button>
  </div>
</template>
