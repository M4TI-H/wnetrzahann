<script setup lang="ts">
import { useContactStore } from "~/stores/contact";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "primevue/usetoast";
import { computed, ref, onMounted } from "vue";
const { t } = useI18n();

const { sendMessage, messageLoading } = useSendMessage();
const contactStore = useContactStore();
const toast = useToast();
const config = useRuntimeConfig();

const token = ref<string>("");
const isClosedByBackButton = ref<boolean>(false);

useHead({
  bodyAttrs: {
    class: computed(() =>
      contactStore.isContactFormOpen ? "overflow-hidden" : "",
    ),
  },
});

const validationSchema = computed(() =>
  toTypedSchema(
    z.object({
      name: z.string().min(1, { message: t("contact.validation.name") }),
      email: z
        .string()
        .min(1, { message: t("contact.validation.emailRequired") })
        .email(t("contact.validation.emailInvalid")),
      phone: z.string().optional().or(z.literal("")),
      message: z.string().min(1, { message: t("contact.validation.message") }),
    }),
  ),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
});

const fieldOptions = {
  validateOnValueUpdate: true,
  validateOnInput: true,
  validateOnBlur: true,
};

const { value: name, errorMessage: nameError } = useField<string>(
  "name",
  undefined,
  fieldOptions,
);
const { value: email, errorMessage: emailError } = useField<string>(
  "email",
  undefined,
  fieldOptions,
);
const { value: phone, errorMessage: phoneError } = useField<string>(
  "phone",
  undefined,
  fieldOptions,
);
const { value: message, errorMessage: messageError } = useField<string>(
  "message",
  undefined,
  fieldOptions,
);

const recaptchaWidgetId = ref<number | null>(null);
const recaptchaContainer = ref<HTMLElement | null>(null);

const renderRecaptcha = () => {
  if (
    process.client &&
    (window as any).grecaptcha &&
    recaptchaContainer.value
  ) {
    try {
      recaptchaWidgetId.value = (window as any).grecaptcha.render(
        recaptchaContainer.value,
        {
          sitekey: config.public.recaptchaSiteKey,
          callback: (res: string) => (token.value = res),
          "expired-callback": () => (token.value = ""),
        },
      );
    } catch (e) {
      console.error("Błąd renderowania reCAPTCHA:", e);
    }
  }
};

const handleSendMessage = async () => {
  if (!token.value) {
    toast.add({
      severity: "warn",
      summary: t("contact.toast.recaptchaTitle"),
      detail: t("contact.toast.recaptchaMsg"),
      life: 4000,
    });
    return;
  }

  const response = await sendMessage({
    name: name.value,
    phone: phone.value,
    email: email.value,
    message: message.value,
    token: token.value,
  });

  if (
    process.client &&
    (window as any).grecaptcha &&
    recaptchaWidgetId.value !== null
  ) {
    try {
      (window as any).grecaptcha.reset(recaptchaWidgetId.value);
      token.value = "";
    } catch (e) {
      console.warn("Błąd przy wczytywaniu reCaptcha.");
    }
  }

  if (response) {
    toast.add({
      severity: "success",
      summary: t("contact.toast.successTitle"),
      detail: t("contact.toast.successMsg"),
      life: 5000,
    });
    resetForm();
    contactStore.closeContactForm();
  }
};

const onSubmit = handleSubmit(
  async () => {
    await handleSendMessage();
  },
  ({ errors }) => {
    const firstError = Object.values(errors)[0];

    if (firstError) {
      toast.add({
        severity: "error",
        summary: t("contact.toast.errorTitle"),
        detail: firstError as string,
        life: 4000,
      });
    }
  },
);

const handlePopState = () => {
  isClosedByBackButton.value = true;
  contactStore.closeContactForm();
};

onMounted(() => {
  setTimeout(renderRecaptcha, 300);
});

onMounted(() => {
  window.history.pushState({ galleryModal: true }, "");
  window.addEventListener("popstate", handlePopState);
});

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState);

  if (!isClosedByBackButton.value) {
    window.history.back();
  }
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
      class="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-sm p-2 overflow-y-auto"
      @click.self="contactStore.closeContactForm"
    >
      <Transition
        appear
        enter-active-class="transition-all duration-500 delay-100 ease-out"
        enter-from-class="opacity-0 translate-y-20 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
      >
        <form
          @submit="onSubmit"
          class="w-full max-w-lg bg-gray-100 border border-black flex flex-col gap-4 md:gap-8 p-4 md:p-8 my-auto"
        >
          <div class="w-full flex items-center justify-between">
            <h1 class="text-xl md:text-2xl lg:text-3xl">
              {{ $t("contact.cta") }}
            </h1>
            <button
              type="button"
              @click.prevent="contactStore.closeContactForm"
              :aria-label="$t('contact.close')"
              class="hover:bg-black/20 active:bg-black/20 focus:bg-black/20 outline-0 text-sm p-1 flex items-center justify-center transition-colors duration-200 ease-in-out cursor-pointer"
            >
              <i class="pi pi-times text-gray-500"></i>
            </button>
          </div>

          <div class="flex flex-col gap-4">
            <input
              type="text"
              v-model="name"
              :placeholder="$t('contact.placeholder.name')"
              :class="{ 'bg-red-100': nameError }"
              class="text-sm md:text-base px-2 py-3 md:py-4 border border-black focus:outline-none focus-visible:outline-1 focus-visible:outline-black"
            />
            <input
              type="text"
              v-model="email"
              :placeholder="$t('contact.placeholder.email')"
              :class="{ 'bg-red-100': emailError }"
              class="text-sm md:text-base px-2 py-3 md:py-4 border border-black focus:outline-none focus-visible:outline-1 focus-visible:outline-black"
            />
            <input
              type="text"
              v-model="phone"
              :placeholder="$t('contact.placeholder.phone')"
              :class="{ 'bg-red-100': phoneError }"
              class="text-sm md:text-base px-2 py-3 md:py-4 border border-black focus:outline-none focus-visible:outline-1 focus-visible:outline-black"
            />
            <textarea
              maxlength="500"
              v-model="message"
              :placeholder="$t('contact.placeholder.content')"
              :class="{ 'bg-red-100': messageError }"
              class="h-24 md:h-32 text-sm md:text-base p-2 border border-black focus:outline-none focus-visible:outline-1 focus-visible:outline-black resize-none"
            ></textarea>
            <div ref="recaptchaContainer"></div>
            <button
              type="submit"
              :disabled="messageLoading"
              class="w-full h-12 md:h-16 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold outline-0 focus:border-black focus:bg-black transition-colors duration-300 ease-in-out"
              :class="{
                'opacity-50 cursor-not-allowed': messageLoading,
                'cursor-pointer': !messageLoading,
              }"
            >
              <span v-if="!messageLoading">{{ $t("contact.send") }}</span>
              <i v-else class="pi pi-spinner pi-spin"></i>
            </button>
            <p class="text-xs sm:text-sm text-gray-500">
              {{ $t("contact.clause") }}
            </p>
          </div>
        </form>
      </Transition>
    </div>
  </Transition>
</template>
