<script setup lang="ts">
const cookiesStore = useCookiesModalStore();

const cookie = useCookieConsent();

const acceptCookies = () => {
  cookie.value = "true";
  cookiesStore.closeModal();
};
</script>

<template>
  <section
    class="fixed z-50 bottom-2 left-2 p-2 lg:p-4 border border-black flex items-center gap-4 bg-white"
  >
    <p class="text-xs md:text-sm">
      {{ $t("cookies.text") }}
    </p>
    <button
      @click="acceptCookies"
      class="ml-auto w-full lg:w-min py-1 px-2 bg-neutral-800 hover:bg-black text-xs md:text-sm text-gray-100 border border-black transition-colors duration-300 ease-in-out outline-none focus:border-2 focus:bg-black"
    >
      {{ $t("cookies.button") }}
    </button>
  </section>
</template>
