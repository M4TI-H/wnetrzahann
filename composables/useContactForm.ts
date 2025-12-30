export const useContactForm = () => {
  const isContactFormOpen = useState("isContactFormOpen", () => false);

  const openContactForm = () => {
    isContactFormOpen.value = true;
  };

  const closeContactForm = () => {
    isContactFormOpen.value = false;
  };

  return { isContactFormOpen, openContactForm, closeContactForm };
};
