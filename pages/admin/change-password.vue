<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
    <section
      class="w-full max-w-[90vw] sm:max-w-sm md:max-w-lg bg-gray-100 border border-black flex flex-col gap-4 md:gap-8 p-4 md:p-8 my-auto"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="text-xl md:text-2xl lg:text-3xl">Zmiana hasła</h1>
        <NuxtLink
          to="/admin"
          class="text-sm text-gray-500 hover:underline cursor-pointer"
          >Anuluj</NuxtLink
        >
      </div>

      <div class="relative w-full flex items-center">
        <div
          class="absolute top-1/2 -translate-y-1/2 px-3 md:px-4 h-full bg-neutral-800 flex items-center justify-center"
        >
          <i class="pi pi-user text-xl text-gray-100"></i>
        </div>
        <input
          type="text"
          placeholder="Login"
          class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
        />
      </div>

      <div class="relative w-full flex items-center">
        <div
          class="absolute top-1/2 -translate-y-1/2 px-3 md:px-4 h-full bg-neutral-800 flex items-center justify-center"
        >
          <i class="pi pi-lock-open text-xl text-gray-100"></i>
        </div>
        <input
          type="password"
          placeholder="Stare hasło"
          class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
        />
      </div>
      <div class="relative w-full flex items-center">
        <div
          class="absolute top-1/2 -translate-y-1/2 px-3 md:px-4 h-full bg-neutral-800 flex items-center justify-center"
        >
          <i class="pi pi-lock text-xl text-gray-100"></i>
        </div>
        <input
          type="password"
          placeholder="Nowe hasło"
          class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
        />
      </div>

      <button
        class="mt-12 w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
      >
        Potwierdź
      </button>
    </section>
  </section>
</template>
