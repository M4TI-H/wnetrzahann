<script setup lang="ts">
import ContactData from "~/components/dashboard/contactData.vue";

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <section class="flex-1 flex flex-col p-4 md:p-8 gap-4 md:gap-8 bg-gray-100">
    <h1 class="text-4xl self-center">Panel zarządzania treścią</h1>
    <ContactData />
  </section>
</template>
