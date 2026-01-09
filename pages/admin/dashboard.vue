<script setup lang="ts">
import ContactData from "~/components/dashboard/contactData.vue";
import ProjectsList from "~/components/dashboard/projectsSection/projectsList.vue";

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <section
    class="flex-1 flex flex-col p-4 md:p-8 gap-4 md:gap-8 bg-gray-100 overflow-y-auto"
  >
    <h1 class="text-2xl md:text-3xl lg:text-4xl self-center">
      Panel zarządzania treścią
    </h1>
    <div class="w-full flex flex-col lg:flex-row gap-4 md:gap-8">
      <ContactData />
      <ProjectsList />
    </div>
  </section>
</template>
