<script setup lang="ts">
import DeleteModal from "~/components/dashboard/projectsSection/deleteModal.vue";
import ProjectForm from "~/components/dashboard/projectsSection/projectForm.vue";

const deleteModalStore = useDeleteModalStore();
const projectStore = useProjectStore();
const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.initializeUser();
});
</script>

<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <div
      class="w-full py-3 flex items-center justify-between px-8 bg-neutral-800"
    >
      <NuxtLink
        to="/"
        class="h-12 opacity-100 transition-all duration-500 ease-in-out delay-50 cursor-pointer select-none"
      >
        <img
          draggable="false"
          src="/logo-half.png"
          class="h-full select-none"
        />
      </NuxtLink>

      <button
        v-if="userStore.user"
        @click="userStore.signOut"
        class="px-6 py-2 border border-black bg-neutral-700 hover:bg-neutral-800/80 text-gray-200 font-semibold transition-colors duration-300 ease-in-out flex items-center gap-2 cursor-pointer"
      >
        <i class="pi pi-sign-out"></i>
        Wyloguj
      </button>
    </div>
    <main class="flex-1 flex flex-col overflow-hidden">
      <slot />
    </main>

    <Toast position="top-right" />

    <DeleteModal v-if="deleteModalStore.isModalOpened" />
    <ProjectForm v-if="projectStore.isProjectFormOpen" />
  </section>
</template>
