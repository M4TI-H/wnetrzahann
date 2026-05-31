<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const deleteModalStore = useDeleteModalStore();
const toast = useToast();

useHead({
  bodyAttrs: {
    class: computed(() =>
      deleteModalStore.isModalOpened ? "overflow-hidden" : "",
    ),
  },
});

const submitDelete = () => {
  deleteModalStore.deleteProject();

  toast.add({
    severity: "success",
    summary: "Sukces",
    detail: "Pomyślnie usunięto projekt.",
    life: 5000,
  });
};
</script>

<template>
  <div
    v-if="deleteModalStore.project"
    @click="deleteModalStore.closeModal"
    class="fixed z-50 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
  >
    <section
      class="w-full sm:max-w-md p-4 lg:p-6 border border-black flex flex-col gap-4 bg-white"
    >
      <h2 class="text-xl md:text-2xl lg:text-3xl">Usuwanie projektu</h2>
      <p>Czy na pewno chcesz usunąć {{ deleteModalStore.project.name }}?</p>
      <div
        class="mt-4 lg:mt-8 w-full flex flex-col-reverse lg:flex-row items-center gap-2"
      >
        <button
          @click="deleteModalStore.closeModal"
          class="text-sm text-gray-500 hover:underline cursor-pointer"
        >
          Anuluj
        </button>
        <button
          @click="submitDelete"
          class="ml-auto w-full lg:w-min py-2 px-4 bg-neutral-800 hover:bg-black text-sm lg:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out cursor-pointer"
        >
          Potwierdź
        </button>
      </div>
    </section>
  </div>
</template>
