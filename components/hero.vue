<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
  >
    <div
      class="absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center gap-8 bg-black/30"
    >
      <img
        src="/logo-white.png"
        class="h-32 lg:h-64 select-none"
        draggable="false"
      />
      <NuxtLink
        to="/projekty"
        class="group py-1 lg:py-2 px-2 lg:px-4 flex gap-4 items-center border border-white text-white text-sm lg:text-base backdrop-blur-sm hover:backdrop-blur cursor-pointer transition-all duration-300 ease-in-out select-none"
        >Projekty
        <i
          class="pi pi-arrow-right text-white transition-transform duration-500 group-hover:translate-x-1 select-none"
        ></i>
      </NuxtLink>
    </div>
    <img
      src="/concept.jpg"
      draggable="false"
      class="w-full h-full object-cover select-none"
    />
  </div>
</template>
