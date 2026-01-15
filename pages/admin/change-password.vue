<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();

const validationSchema = toTypedSchema(
  z.object({
    login: z.string().min(1, "Login jest wymagany!"),
    oldPassword: z.string().min(1, "Podaj stare hasło!"),
    newPassword: z.string().min(6, "Hasło musi mieć conajmniej 6 znaków!"),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    login: "",
    oldPassword: "",
    newPassword: "",
  },
});

const { value: login, errorMessage: loginError } = useField<string>("login");
const { value: oldPassword, errorMessage: oldPasswordError } =
  useField<string>("oldPassword");
const { value: newPassword, errorMessage: newPasswordError } =
  useField<string>("newPassword");
const invalidCredentials = ref<string | null>();

const handlePasswordChange = async () => {
  try {
    await userStore.changePassword(
      login.value,
      oldPassword.value,
      newPassword.value
    );

    alert("Hasło zostało zaktualizowane.");
    navigateTo("/admin");
  } catch (error: any) {
    console.error(error);
    invalidCredentials.value = "Błędne dane użytkownika. Spróbuj ponownie.";
  }
};

const onSubmit = handleSubmit(handlePasswordChange);
</script>

<template>
  <section class="flex-1 flex flex-col items-center p-4 md:p-8">
    <form
      @submit="onSubmit"
      class="w-full sm:max-w-sm md:max-w-lg bg-gray-100 border border-black flex flex-col gap-4 md:gap-8 p-4 md:p-8 my-auto"
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
          v-model="login"
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
          v-model="oldPassword"
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
          v-model="newPassword"
          type="password"
          placeholder="Nowe hasło"
          class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
        />
      </div>

      <button
        type="submit"
        :disabled="userStore.loading"
        class="relative w-full py-2 md:py-3 bg-neutral-800 hover:bg-black text-sm md:text-base text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black transition-colors duration-300 ease-in-out disabled:opacity-70"
      >
        <div
          v-if="userStore.loading"
          class="absolute inset-0 flex items-center justify-center"
        >
          <i class="pi pi-spin pi-spinner text-xl md:text-2xl"></i>
        </div>

        <span :class="{ invisible: userStore.loading }">Potwierdź</span>
      </button>
    </form>
  </section>
</template>
