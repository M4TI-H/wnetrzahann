<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "primevue/usetoast"; // 1. Import Toasta

useSeoMeta({
  title: () => $t("seo.home.title"),
  ogTitle: () => $t("seo.home.title"),
  ogImage: "https://hannwnetrza.pl/logo_white.png",
  ogUrl: "https://hannwnetrza.pl",
  ogType: "website",
});

const userStore = useUserStore();
const toast = useToast(); // 2. Inicjalizacja Toasta

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const validationSchema = toTypedSchema(
  z.object({
    login: z.string().min(1, "Login jest wymagany!"),
    password: z.string().min(1, "Hasło jest wymagane!"),
  }),
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    login: "",
    password: "",
  },
});

const { value: login } = useField<string>("login");
const { value: password } = useField<string>("password");
const invalidCredentials = ref<string | null>();

const handleLogin = async () => {
  invalidCredentials.value = null;
  try {
    await userStore.signIn(login.value, password.value);
    const user = useSupabaseUser();
    if (user.value) {
      // Opcjonalnie: Toast o pomyślnym zalogowaniu (choć przy natychmiastowym przekierowaniu może nie zdążyć się wyświetlić)
      return await navigateTo("/admin/dashboard", { replace: true });
    }
  } catch (error: any) {
    console.error(error);

    let errorMsg = "Wystąpił nieoczekiwany błąd.";

    if (error.message === "Invalid login credentials") {
      errorMsg = "Błędne dane logowania. Spróbuj ponownie.";
    } else if (error.status === 400) {
      errorMsg = "Nieprawidłowe zapytanie do serwera.";
    } else {
      errorMsg = error.message;
    }

    // 3. Wywołanie Toasta dla błędu logowania (zastępuje errorStore)
    toast.add({
      severity: "error",
      summary: "Błąd logowania",
      detail: errorMsg,
      life: 5000,
    });
  }
};

// 4. Dodana obsługa błędów walidacji z Zod
const onSubmit = handleSubmit(
  async () => {
    await handleLogin();
  },
  ({ errors }) => {
    const firstError = Object.values(errors)[0];

    if (firstError) {
      toast.add({
        severity: "warn",
        summary: "Błąd formularza",
        detail: firstError as string,
        life: 4000,
      });
    }
  },
);

const passwordVisibility = ref<string>("password");
const togglePassword = () => {
  if (passwordVisibility.value == "password") passwordVisibility.value = "text";
  else if (passwordVisibility.value == "text")
    passwordVisibility.value = "password";
};
</script>

<template>
  <section class="flex-1 flex flex-col items-center p-4 md:p-8">
    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-lg bg-gray-100 border border-black flex flex-col gap-4 md:gap-8 p-4 md:p-8 my-auto"
    >
      <h1 class="text-xl md:text-2xl lg:text-3xl">Logowanie</h1>

      <div class="relative w-full flex items-center">
        <div
          class="absolute top-1/2 -translate-y-1/2 px-3 md:px-4 h-full bg-neutral-800 flex items-center justify-center"
        >
          <i class="pi pi-user text-xl text-gray-100"></i>
        </div>
        <input
          v-model="login"
          type="text"
          placeholder="Login"
          class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
        />
      </div>

      <div class="w-full flex flex-col items-end gap-2">
        <div class="relative w-full flex items-center">
          <div
            class="absolute top-1/2 -translate-y-1/2 px-3 md:px-4 h-full bg-neutral-800 flex items-center justify-center"
          >
            <i class="pi pi-lock text-xl text-gray-100"></i>
          </div>
          <input
            v-model="password"
            :type="passwordVisibility"
            placeholder="Hasło"
            class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
          />
          <button
            @click="togglePassword"
            type="button"
            class="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-full flex items-center justify-center cursor-pointer"
          >
            <i
              v-if="passwordVisibility === 'password'"
              class="pi pi-eye text-xl text-neutral-800"
            ></i>
            <i
              v-if="passwordVisibility === 'text'"
              class="pi pi-eye-slash text-xl text-neutral-800"
            ></i>
          </button>
        </div>
        <NuxtLink
          to="/admin/change-password"
          class="mx-2 text-gray-500 hover:text-gray-800 transition-colors duration-300 ease-in-out cursor-pointer"
          >Zmień hasło</NuxtLink
        >
      </div>

      <button
        type="submit"
        :disabled="userStore.loading"
        class="relative w-full py-2 md:py-3 bg-neutral-800 hover:bg-black cursor-pointer text-sm md:text-base text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black transition-colors duration-300 ease-in-out disabled:opacity-70"
      >
        <div
          v-if="userStore.loading"
          class="absolute inset-0 flex items-center justify-center"
        >
          <i class="pi pi-spin pi-spinner text-xl md:text-2xl"></i>
        </div>

        <span :class="{ invisible: userStore.loading }">Zaloguj</span>
      </button>
    </form>
  </section>
</template>
