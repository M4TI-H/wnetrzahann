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
        class="group py-2 lg:py-4 px-4 lg:px-8 flex gap-4 items-center border border-white text-white lg:text-xl backdrop-blur-sm hover:backdrop-blur cursor-pointer transition-all duration-200 ease-in-out select-none"
        >Projekty
        <i
          class="pi pi-arrow-right text-sm lg:text-xl text-white transition-transform duration-500 group-hover:translate-x-2 select-none"
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
