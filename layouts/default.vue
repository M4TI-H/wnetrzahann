<script setup lang="ts"></script>

<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <Navbar />

    <OnScrollSection />
    <ContactForm />
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </section>
</template>
