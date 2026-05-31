import { useToast } from "primevue/usetoast";

export const useSendMessage = () => {
  const contactStore = useContactStore();
  const messageLoading = ref<boolean>(false);
  const toast = useToast();

  const sendMessage = async (data: {
    name: string;
    phone: string;
    email: string;
    message: string;
    token: string;
  }) => {
    messageLoading.value = true;

    try {
      await $fetch("/api/send-message", {
        method: "POST",
        body: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          time: new Date().toLocaleString("pl-PL"),
          message: data.message,
          captcha_value: data.token,
        },
      });

      toast.add({
        severity: "success",
        summary: $t("contact.toast.successTitle"),
        detail: $t("contact.toast.successMsg"),
        life: 5000,
      });

      contactStore.closeContactForm();
      return true;
    } catch (error: any) {
      console.error(error);

      toast.add({
        severity: "error",
        summary: $t("contact.toast.errorTitle"),
        detail: $t("contact.toast.errorMsg"),
        life: 5000,
      });

      return false;
    } finally {
      messageLoading.value = false;
    }
  };

  return {
    sendMessage,
    messageLoading,
  };
};
