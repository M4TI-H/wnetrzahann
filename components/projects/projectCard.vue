<script setup lang="ts">
import type Project from "~/models/Project";

const prop = defineProps<{
  data: Project;
}>();
</script>
<template>
  <div class="w-full md:h-[32rem]">
    <NuxtLink
      :to="`/projekty/${data.name}`"
      class="relative w-full h-full bg-gray-300"
    >
      <img :src="data.cover" class="h-full w-full object-cover" />
      <div
        class="opacity-0 hover:opacity-100 absolute z-10 bottom-0 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-b from-transparent to-black/50 transition-opacity duration-300 ease-in-out"
      >
        <p class="text-sm lg:text-base text-white font-thin">
          {{ data.category }}
        </p>
        <div class="w-full flex items-end justify-between">
          <p class="text-xl md:text-2xl lg:text-3xl text-white">
            {{ data.name.toUpperCase() }}
          </p>
          <p class="text-sm lg:text-base text-white font-thin">
            {{ data.creationDate }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
