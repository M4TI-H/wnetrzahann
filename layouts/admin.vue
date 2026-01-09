<script setup lang="ts">
import DeleteModal from "~/components/dashboard/projectsSection/deleteModal.vue";
import ProjectForm from "~/components/dashboard/projectsSection/projectForm.vue";

const deleteModalStore = useDeleteModalStore();
const projectStore = useProjectStore();
const userStore = useUserStore();
</script>

<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <div class="w-full h-24 flex items-center justify-between px-8 bg-gray-500">
      Nagłówek
      <button
        @click="userStore.signOut"
        class="py-2 px-4 bg-gray-100 border border-black"
      >
        Wyloguj
      </button>
    </div>
    <main class="flex-1 flex flex-col overflow-y-auto">
      <slot />
    </main>
    <DeleteModal v-if="deleteModalStore.isModalOpened" :name="'proj'" />
    <ProjectForm v-if="projectStore.isProjectFormOpen" />
  </section>
</template>
