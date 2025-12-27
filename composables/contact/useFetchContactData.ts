import type ContactData from "~/models/ContactData";

export const useFetchContact = () => {
  const {
    data: contactData,
    pending: contactLoading,
    error: contactError,
  } = useAsyncData<ContactData>("contact-data", () =>
    $fetch("/api/contact/fetch_contact")
  );

  return { contactData, contactLoading, contactError };
};
