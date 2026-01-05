<script setup lang="ts">
const { isContactFormOpen, closeContactForm } = useContactForm();

useHead({
  bodyAttrs: {
    class: computed(() => (isContactFormOpen.value ? "overflow-hidden" : "")),
  },
});
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isContactFormOpen"
      class="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-sm p-2 overflow-y-auto"
      @click.self="closeContactForm"
    >
      <Transition
        appear
        enter-active-class="transition-all duration-500 delay-100 ease-out"
        enter-from-class="opacity-0 translate-y-20 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
      >
        <section
          class="w-full max-w-lg bg-gray-100 border border-black flex flex-col gap-4 md:gap-8 p-4 md:p-8 my-auto"
        >
          <div class="w-full flex items-center justify-between">
            <h1 class="text-xl md:text-2xl lg:text-3xl">Napisz wiadomość</h1>
            <button
              @click="closeContactForm"
              class="hover:bg-black/20 active:bg-black/20 p-1 flex items-center justify-center transition-colors"
            >
              <i class="pi pi-times text-xl text-black"></i>
            </button>
          </div>

          <div class="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Imię i nazwisko"
              class="text-sm md:text-base px-2 py-3 md:py-4 border border-black outline-0"
            />
            <input
              type="text"
              placeholder="Adres e-mail"
              class="text-sm md:text-base px-2 py-3 md:py-4 border border-black outline-0"
            />
            <input
              type="text"
              placeholder="Numer telefonu (opcjonalnie)"
              class="text-sm md:text-base px-2 py-3 md:py-4 border border-black outline-0"
            />
            <textarea
              placeholder="Treść zapytania"
              class="h-24 md:h-32 text-sm md:text-base p-2 border border-black outline-0 resize-none"
            ></textarea>
            <button
              class="w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
            >
              Wyślij
            </button>
            <p class="text-xs sm:text-sm text-gray-500">
              Wysyłając wiadomość, wyrażasz zgodę na przetwarzanie danych
              osobowych w celu udzielenia odpowiedzi na Twoje zapytanie.
            </p>
          </div>
        </section>
      </Transition>
    </div>
  </Transition>
</template>
