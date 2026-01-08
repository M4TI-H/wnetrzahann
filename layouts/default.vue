<script setup lang="ts">
const route = useRoute();

const contactStore = useContactStore();

const navbarMode = computed<"dynamic" | "base" | "compact">(
  () => (route.meta.navbar as "dynamic" | "base" | "compact") ?? "base"
);
</script>

<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <Navbar :mode="navbarMode" />

    <OnScrollSection />

    <ContactForm v-if="contactStore.isContactFormOpen" />
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
    <Footer />
  </section>
</template>
