export const useSendMessage = () => {
  const errorStore = useErrorStore();
  const contactStore = useContactStore();
  const messageLoading = ref<boolean>(false);

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

      errorStore.addMessage({
        type: "success",
        message: "Wiadomość została wysłana pomyślnie!",
      });

      contactStore.closeContactForm();
      return true;
    } catch (error: any) {
      console.error(error);

      errorStore.addMessage({
        type: "failure",
        message:
          "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.",
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
