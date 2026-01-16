export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pl",
  messages: {
    pl: {
      nav: {
        projects: "PROJEKTY",
        contact: "KONTAKT",
      },
      hero: {
        button: "Projekty",
      },
      main: {
        section1: "OSTATNIE PROJEKTY",
      },
      contact: {
        title: "Kontakt",
        monFri: "Pon-Pt",
        monFriHours: "8.00 - 16.00",
        satSun: "Sob-Nd",
        satSunHours: "Nieczynne",
        or: "lub",
        cta: "Napisz wiadomość",
        send: "Wyślij",
        clause:
          "Wysyłając wiadomość, wyrażasz zgodę na przetwarzanie danych osobowych w celu udzielenia odpowiedzi na Twoje zapytanie.",
        placeholder: {
          name: "Imię i nazwisko",
          email: "Adres e-mail",
          phone: "Numer telefonu (opcjonalnie)",
          content: "Treść zapytania",
        },
      },
      projects: {
        title: "Projekty",
        filters: {
          commercial: "KOMERCYJNE",
          residential: "PRYWATNE",
          all: "WSZYSTKIE",
        },
        loading: {
          true: "Wczytywanie",
          false: "Pokaż więcej",
        },
        noMoreProjects: "Brak projektów spełniających kryteria.",
        search: "Wyszukaj projekt",
        backBtn: "Powrót",
        closeBtn: "Zamknij",
      },
      footer: {
        clause: "Wszystkie prawa zastrzeżone",
      },
    },
    en: {
      nav: {
        projects: "PROJECTS",
        contact: "CONTACT",
      },
      hero: {
        button: "Projects",
      },
      main: {
        section1: "RECENT PROJECTS",
      },
      contact: {
        title: "Contact",
        monFri: "Mon-Fri",
        monFriHours: "8.00am - 4.00pm",
        satSun: "Sat-Sun",
        satSunHours: "Closed",
        or: "or",
        cta: "Send a message",
        send: "Send",
        clause:
          "By sending a message, you consent to the processing of your personal data in order to respond to your inquiry.",
        placeholder: {
          name: "Your name and last name",
          email: "E-mail address",
          phone: "Phone number (optional)",
          content: "Inquiry content",
        },
      },
      projects: {
        title: "Projects",
        filters: {
          commercial: "COMMERCIAL",
          residential: "RESIDENTIAL",
          all: "ALL",
        },
        loading: {
          true: "LOADING",
          false: "LOAD MORE",
        },
        noMoreProjects: "No projects meeting the criteria.",
        search: "Search for a project",
        backBtn: "Back",
        closeBtn: "Close",
      },
      footer: {
        clause: "All rights reserved",
      },
    },
  },
}));
