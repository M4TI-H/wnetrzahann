<script setup lang="ts"></script>

<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <div class="w-full h-24 flex items-center py-2 px-8 bg-gray-500">
      Nagłówek
    </div>
    <main class="flex-1 flex flex-col overflow-y-auto">
      <slot />
    </main>
  </section>
</template>
