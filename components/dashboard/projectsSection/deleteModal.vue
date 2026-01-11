<script setup lang="ts">
const deleteModalStore = useDeleteModalStore();

useHead({
  bodyAttrs: {
    class: computed(() =>
      deleteModalStore.isModalOpened ? "overflow-hidden" : ""
    ),
  },
});
</script>

<template>
  <div
    v-if="deleteModalStore.project"
    @click="deleteModalStore.closeModal"
    class="fixed z-50 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
  >
    <section
      class="w-full max-w-[95vw] sm:max-w-md p-4 lg:p-6 border border-black flex flex-col gap-4 bg-white"
    >
      <h2 class="text-xl md:text-2xl lg:text-3xl">Usuwanie projektu</h2>
      <p>Czy na pewno chcesz usunąć {{ deleteModalStore.project.name }}?</p>
      <div
        class="mt-4 lg:mt-8 w-full flex flex-col-reverse lg:flex-row items-center gap-2"
      >
        <button
          @click="deleteModalStore.closeModal"
          class="text-sm text-gray-500 hover:underline"
        >
          Anuluj
        </button>
        <button
          @click="deleteModalStore.deleteProject"
          class="ml-auto w-full lg:w-min py-2 px-4 bg-neutral-800 hover:bg-black text-sm lg:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out"
        >
          Potwierdź
        </button>
      </div>
    </section>
  </div>
</template>
