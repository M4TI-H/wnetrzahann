<script setup lang="ts">
const { locale } = useI18n();

useHead({
  meta: [
    {
      property: "og:locale",
      content: () => (locale.value === "pl" ? "pl_PL" : "en_US"),
    },
  ],
});
</script>

<template>
  <NuxtLayout class="font-sans">
    <NuxtPage />
  </NuxtLayout>
</template>
