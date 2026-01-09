import type Contact from "~/models/Contact";

export function useEditContact() {
  const contactLoading = ref<boolean>(false);
  const contactError = ref<string | null>();

  const updateContactData = async (type: string, value: string) => {
    contactLoading.value = true;

    try {
      await $fetch<Contact>("/api/contact/update", {
        method: "PUT",
        body: { type, value },
      });

      return "success";
    } catch (error: any) {
      contactError.value = error.data?.statusMessage || "Wystąpił błąd zapisu";
      console.error("Update Error:", error);
      return "error";
    } finally {
      contactLoading.value = false;
    }
  };

  return {
    contactLoading,
    contactError,
    updateContactData,
  };
}
