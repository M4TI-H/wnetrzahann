<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <div
    class="fixed z-50 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
  >
    <section
      class="w-full max-w-[95vw] sm:max-w-md p-4 lg:p-6 border border-black flex flex-col gap-4 bg-white"
    >
      <h2 class="text-xl md:text-2xl lg:text-3xl">Usuwanie projektu</h2>
      <p>Czy na pewno chcesz usunąć {{ props.name }}?</p>
      <div
        class="mt-4 lg:mt-8 w-full flex flex-col-reverse lg:flex-row items-center gap-2"
      >
        <button class="text-sm text-gray-500 hover:underline">Anuluj</button>
        <button
          class="ml-auto w-full lg:w-min py-2 px-4 bg-neutral-800 hover:bg-black text-sm lg:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out"
        >
          Potwierdź
        </button>
      </div>
    </section>
  </div>
</template>
