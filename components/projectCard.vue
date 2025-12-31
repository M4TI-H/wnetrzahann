<script setup lang="ts">
import type Project from "~/models/Project";

const prop = defineProps<{
  data: Project;
}>();
</script>
<template>
  <div
    class="w-[90%] lg:w-2/3 md:h-[32rem] flex flex-col md:flex-row sm:p-4 md:p-8"
  >
    <div
      class="w-full lg:w-2/3 min-h-44 h-full bg-gray-300 border border-gray-300"
    >
      <img :src="data.cover" class="h-full w-full object-cover" />
    </div>
    <div class="flex-1 h-full flex flex-col px-2 md:px-4 md:gap-1 pt-1">
      <div class="w-full flex items-start justify-between">
        <p class="text-sm md:text-base">{{ data.category }}</p>
        <p class="text-sm md:text-base text-gray-500">
          {{ data.creationDate }}
        </p>
      </div>
      <NuxtLink
        class="text-xl md:text-2xl font-semibold hover:underline cursor-pointer whitespace-nowrap"
        >{{ data.name.toUpperCase() }}</NuxtLink
      >
      <p class="text-sm md:text-base text-gray-500">{{ data.description }}</p>
    </div>
  </div>
</template>
