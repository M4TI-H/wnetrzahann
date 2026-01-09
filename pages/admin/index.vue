<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const supabase = useSupabaseClient();

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

const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: login.value.trim(),
      password: password.value,
    });

    if (error) {
      console.error(error);
    }

    if (data.user) {
      navigateTo("/admin/dashboard");
    }
  } catch (error: any) {
    console.error(error);
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
        class="mt-12 w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
      >
        Zaloguj
      </button>
    </form>
  </section>
</template>
