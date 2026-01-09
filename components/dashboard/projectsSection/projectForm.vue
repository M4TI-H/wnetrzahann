<script setup lang="ts">
import ImagesInput from "./imagesInput.vue";

const projectStore = useProjectStore();
</script>
<template>
  <div
    class="fixed z-50 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
  >
    <section
      class="w-full max-w-[95vw] sm:max-w-4xl p-4 border border-black flex flex-col gap-4 bg-white"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="text-xl md:text-2xl lg:text-3xl">
          {{
            projectStore.mode === "edit" ? "Edycja projektu" : "Nowy projekt"
          }}
        </h1>
        <button
          @click="projectStore.closeProjectForm"
          class="hover:bg-black/20 active:bg-black/20 text-sm p-1 flex items-center justify-center transition-colors duration-200 ease-in-out"
        >
          <i class="pi pi-times text-gray-500"></i>
        </button>
      </div>
      <div class="w-full flex flex-col md:flex-row gap-4">
        <div class="w-1/2 flex flex-col gap-8">
          <div class="flex flex-col">
            <div
              class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
            >
              <i class="pi pi-tag"></i>
              <p class="text-xs md:text-sm">Nazwa</p>
            </div>

            <input
              type="text"
              class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base border border-black"
            />
          </div>
          <div class="flex flex-col">
            <div
              class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
            >
              <i class="pi pi-home"></i>
              <p class="text-xs md:text-sm">Kategoria</p>
            </div>
            <select
              class="w-full py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base flex items-center justify-between border border-black"
            >
              <option class="text-xs md:text-sm"></option>
              <option class="text-xs md:text-sm">Projekt komerycjny</option>
              <option class="text-xs md:text-sm">Projekt prywatny</option>
            </select>
          </div>
          <div class="w-full flex items-center gap-2">
            <div class="flex-1 w-full flex flex-col">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-tag"></i>
                <p class="text-xs md:text-sm">Powierzchnia</p>
              </div>
              <div
                class="w-full flex items-center justify-between border border-black"
              >
                <input
                  type="text"
                  class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base w-0"
                />
                <p class="px-2 text-sm md:text-base shrink-0">m&sup2;</p>
              </div>
            </div>

            <div class="flex-1 w-full flex flex-col">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-calendar"></i>
                <p class="text-xs md:text-sm">Data utworzenia</p>
              </div>
              <div
                class="w-full flex items-center justify-between border border-black"
              >
                <input
                  type="text"
                  class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base w-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/2 flex flex-col gap-2">
          <ImagesInput />
        </div>
      </div>
      <button
        class="mt-4 ml-auto w-full sm:max-w-56 py-2 px-4 bg-neutral-800 hover:bg-black text-sm lg:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out"
      >
        {{ projectStore.mode === "edit" ? "Zatwierdź zmiany" : "Potwierdź" }}
      </button>
    </section>
  </div>
</template>
