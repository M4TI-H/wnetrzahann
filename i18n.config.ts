export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pl",
  messages: {
    pl: {
      nav: {
        projects: "PROJEKTY",
        contact: "KONTAKT",
        changeLang: "Zmień język na angielski",
      },
      hero: {
        button: "Projekty",
        scrollDown: "Przewiń w dół",
      },
      main: {
        section1: "OSTATNIE PROJEKTY",
      },
      scrollSection: {
        scrollToTop: "Powrót na szczyt strony",
        openContact: "Otwórz formularz kontaktowy",
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
        close: "Zamknij formularz",
      },
      projects: {
        title: "Projekty",
        category: {
          commercial: "Projekt komercyjny",
          residential: "Projekt prywatny",
        },
        filters: {
          commercial: "KOMERCYJNE",
          residential: "PRYWATNE",
          all: "WSZYSTKIE",
          search: "Wyszukaj projekt",
        },
        loading: {
          true: "Wczytywanie",
          false: "Pokaż więcej",
        },
        noMoreProjects: "Brak projektów spełniających kryteria.",
        search: "Wyszukaj projekt",
        backBtn: "Powrót",
        closeBtn: "Zamknij",
        gallery: "Galeria zdjęć",
        next: "Następne zdjęcie",
        previous: "Poprzednie zdjęcie",
      },
      cookies: {
        text: "Ta strona używa plików cookies w celach technicznych.",
        button: "Rozumiem",
      },
      footer: {
        clause: "Wszystkie prawa zastrzeżone",
      },
    },
    en: {
      nav: {
        projects: "PROJECTS",
        contact: "CONTACT",
        changeLang: "Change language to Polish",
      },
      hero: {
        button: "Projects",
        scrollDown: "Scroll down",
      },
      main: {
        section1: "RECENT PROJECTS",
      },
      scrollSection: {
        scrollToTop: "Scroll to top of the website",
        openContact: "Open contact form",
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
        close: "Close form",
      },
      projects: {
        title: "Projects",
        category: {
          commercial: "Commercial project",
          residential: "Residential project",
        },
        filters: {
          commercial: "COMMERCIAL",
          residential: "RESIDENTIAL",
          all: "ALL",
          search: "Search project",
        },
        loading: {
          true: "LOADING",
          false: "LOAD MORE",
        },
        noMoreProjects: "No projects meeting the criteria.",
        search: "Search for a project",
        backBtn: "Back",
        closeBtn: "Close",
        gallery: "Image gallery",
        next: "Next image",
        previous: "Previous image",
      },
      cookies: {
        text: "This website uses cookies files for technical reasons.",
        button: "Accept",
      },
      footer: {
        clause: "All rights reserved",
      },
    },
  },
}));
