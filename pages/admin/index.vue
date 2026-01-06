<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
    <section
      class="w-full max-w-lg bg-gray-100 border border-black flex flex-col gap-4 md:gap-8 p-4 md:p-8 my-auto"
    >
      <h1 class="text-xl md:text-2xl lg:text-3xl">Logowanie</h1>

      <div class="relative w-full flex items-center">
        <div
          class="absolute top-1/2 -translate-y-1/2 px-4 h-full bg-neutral-800 flex items-center justify-center"
        >
          <i class="pi pi-user text-xl text-gray-100"></i>
        </div>
        <input
          type="text"
          placeholder="Login"
          class="w-full text-sm md:text-base border border-neutral-800 outline-0 p-3 md:py-4 md:pl-16 md:pr-4"
        />
      </div>

      <div class="w-full flex flex-col items-end gap-2">
        <div class="relative w-full flex items-center">
          <div
            class="absolute top-1/2 -translate-y-1/2 px-4 h-full bg-neutral-800 flex items-center justify-center"
          >
            <i class="pi pi-lock text-xl text-gray-100"></i>
          </div>
          <input
            type="password"
            placeholder="Hasło"
            class="w-full text-sm md:text-base border border-neutral-800 outline-0 p-3 md:py-4 md:pl-16 md:pr-4"
          />
        </div>
        <NuxtLink
          to="/admin/change-password"
          class="mx-2 text-gray-500 hover:text-gray-800 transition-colors duration-300 ease-in-out cursor-pointer"
          >Zmień hasło</NuxtLink
        >
      </div>

      <button
        class="mt-12 w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
      >
        Zaloguj
      </button>
    </section>
  </section>
</template>
