<script setup lang="ts">
const route = useRoute();
const contactStore = useContactStore();
const cookiesStore = useCookiesModalStore();
const scrollStore = useScrollStore();
const errorStore = useErrorStore();

const cookie = useCookieConsent();
if (!cookie.value) {
  cookiesStore.openModal();
}

const navbarMode = computed<"dynamic" | "base" | "compact">(
  () => (route.meta.navbar as "dynamic" | "base" | "compact") ?? "base",
);
</script>

<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <Navbar :mode="navbarMode" />
    <ErrorMessage />
    <OnScrollSection v-if="!scrollStore.hideScroll" />
    <CookiesModal v-if="cookiesStore.isModalOpened" />
    <ContactForm v-if="contactStore.isContactFormOpen" />
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
    <Footer />
  </section>
</template>
