<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const supabase = useSupabaseClient();

const userStore = useUserStore();

definePageMeta({
  layout: "admin",
});

const validationSchema = toTypedSchema(
  z.object({
    login: z.string().min(1, "Login jest wymagany!"),
    password: z.string().min(1, "Hasło jest wymagane!"),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    login: "",
    password: "",
  },
});

const { value: login, errorMessage: loginError } = useField<string>("login");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const invalidCredentials = ref<string | null>();

const handleLogin = async () => {
  try {
    await userStore.signIn(login.value, password.value);
    navigateTo("/admin/dashboard");
  } catch (error: any) {
    console.error(error);
    invalidCredentials.value = "Błędne dane logowania. Spróbuj ponownie.";
  }
};

const onSubmit = handleSubmit(handleLogin);
</script>

<template>
  <section class="flex-1 flex flex-col items-center">
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
            type="password"
            placeholder="Hasło"
            class="w-full text-sm md:text-base border border-neutral-800 outline-0 py-2 md:py-3 pl-12 md:pl-16 pr-2 md:pr-3"
          />
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
        class="relative w-full py-2 md:py-3 bg-neutral-800 hover:bg-black text-sm md:text-base text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black transition-colors duration-300 ease-in-out disabled:opacity-70"
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
