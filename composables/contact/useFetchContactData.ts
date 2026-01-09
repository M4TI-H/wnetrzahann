import type Contact from "~/models/Contact";

export const useFetchContact = () => {
  const {
    data: contactData,
    pending: contactLoading,
    error: contactError,
  } = useAsyncData<Contact>("contact-data", () => $fetch("/api/contact/fetch"));

  return { contactData, contactLoading, contactError };
};
