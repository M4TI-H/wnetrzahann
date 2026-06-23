<script setup lang="ts">
import type Project from "~/models/Project";

const prop = defineProps<{
  data: Project;
}>();

const localePath = useLocalePath();
</script>
<template>
  <div class="w-full md:h-128 my-1">
    <NuxtLink
      :aria-label="`${data.name} ${$t('projects.gallery')}`"
      :to="localePath(`/projekty/${data.id}`)"
      class="relative block w-full h-full bg-gray-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-black"
    >
      <NuxtImg
        :alt="`${data.name} cover image`"
        :src="data.cover"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <div
        class="opacity-100 md:opacity-0 hover:opacity-100 absolute z-10 bottom-0 w-full h-full flex flex-col gap-2 justify-end py-1 px-2 md:p-4 bg-linear-to-b from-transparent to-black/50 transition-opacity duration-300 ease-in-out"
      >
        <div
          class="absolute top-2 left-2 right-2 flex md:hidden items-center justify-between text-sm text-white font-thin"
        >
          <p>
            {{ $t(`projects.category.${data.category}`) }}
          </p>
          <p>
            {{
              new Date(data.creation_date).toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            }}
          </p>
        </div>

        <p class="block md:hidden text-xl text-white">
          {{ data.name.toUpperCase() }}
        </p>

        <p class="hidden md:block text-sm lg:text-base text-white font-thin">
          {{ $t(`projects.category.${data.category}`) }}
        </p>

        <div class="hidden md:flex w-full items-end justify-between">
          <p class="text-2xl lg:text-3xl text-white">
            {{ data.name.toUpperCase() }}
          </p>
          <p class="text-sm lg:text-base text-white font-thin">
            {{
              new Date(data.creation_date).toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
