<script setup lang="ts">
import { useFetchSingle } from "~/composables/projects/useFetchSingle";
import type Project from "~/models/Project";

const prop = defineProps<{
  data: Project;
}>();
</script>
<template>
  <div class="w-full md:h-[32rem]">
    <NuxtLink
      :to="`/projekty/${data.id}`"
      class="relative w-full h-full bg-gray-300"
    >
      <img :src="data.cover" class="h-full w-full object-cover" />
      <div
        class="opacity-100 md:opacity-0 hover:opacity-100 absolute z-10 bottom-0 w-full h-full flex flex-col gap-2 justify-end py-1 px-2 md:p-4 bg-gradient-to-b from-transparent to-black/50 transition-opacity duration-300 ease-in-out"
      >
        <p
          class="absolute top-2 md:relative text-sm lg:text-base text-white font-thin"
        >
          {{ data.category[0].toUpperCase() + data.category.slice(1) }}
        </p>
        <div class="w-full flex items-end justify-between">
          <p class="text-xl md:text-2xl lg:text-3xl text-white">
            {{ data.name.toUpperCase() }}
          </p>
          <p class="text-sm lg:text-base text-white font-thin">
            {{ data.creation_date }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
