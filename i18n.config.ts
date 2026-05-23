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
        section1: "Ostatnie projekty",
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
        validation: {
          name: "Podaj swoje imię i nazwisko.",
          emailRequired: "Podaj adres email do kontaktu.",
          emailInvalid: "Niepoprawny format adresu email.",
          message: "Podaj treść zapytania.",
        },
        toast: {
          recaptchaTitle: "Weryfikacja",
          recaptchaMsg: "Proszę potwierdzić, że jesteś człowiekiem.",
          successTitle: "Sukces",
          successMsg: "Wiadomość została pomyślnie wysłana.",
          errorTitle: "Błąd formularza",
        },
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
      slider: {
        descriptionTop:
          "Z pasją projektuję wnętrza, które łączą estetykę z codzienną funkcjonalnością. Z wieloletnim doświadczeniem w sektorze prywatnym i komercyjnym, tworzę przestrzenie skrojone pod indywidualne potrzeby inwestorów.",
        descriptionBottom:
          "Zachęcam do obejrzenia wybranych projektów i kontaktu.",
      },
      cookies: {
        text: "Ta strona używa plików cookies w celach technicznych.",
        button: "Rozumiem",
      },
      footer: {
        clause: "Wszystkie prawa zastrzeżone",
      },
      error: {
        e404: "Strona, której szukasz, nie istnieje.",
        e500: "Chwilowy błąd techniczny, pracuję nad tym.",
      },
      seo: {
        home: {
          title: "Agata Hann • Architektura Wnętrz",
          description:
            "Projektowanie wnętrz w Słupsku i okolicach. Portfolio projektów wnętrz prywatnych i komercyjnych. Zobacz realizacje apartamentów i biur w stylu nowoczesnym.",
          keywords:
            "architektura wnętrz, projekt wnętrza, architekt, aranżacja wnętrz, biuro projektowe Słupsk, Słupsk, projekty łazienek, projekty kuchni",
        },
        projects: {
          title: "Agata Hann • Portfolio",
          description:
            "Zobacz moje najnowsze realizacje wnętrz. Od nowoczesnych apartamentów po funkcjonalne przestrzenie biurowe.",
          keywords:
            "portfolio architekta, realizacje wnętrz, projekty domów, projekty biur",
        },
        contact: {
          title: "Agata Hann",
          description:
            "Masz pytania? Chcesz wycenić projekt wnętrza? Skontaktuj się ze mną. Biuro projektowe w Słupsku.",
          keywords:
            "kontakt architekt, wycena projektu wnętrz, biuro projektowe Słupsk",
        },
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
        section1: "Recent projects",
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
        cta: "Write a message",
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
        validation: {
          name: "Please enter your name and last name.",
          emailRequired: "Please provide a contact email address.",
          emailInvalid: "Invalid email format.",
          message: "Please enter your inquiry content.",
        },
        toast: {
          recaptchaTitle: "Verification",
          recaptchaMsg: "Please confirm that you are human.",
          successTitle: "Success",
          successMsg: "Your message has been successfully sent.",
          errorTitle: "Form Error",
        },
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
      slider: {
        descriptionTop:
          "I passionately design interiors that blend aesthetics with everyday functionality. With years of experience in both private and commercial sectors, I create spaces tailored to the individual needs of investors.",
        descriptionBottom:
          "I encourage you to explore my selected projects and get in touch.",
      },
      cookies: {
        text: "This website uses cookies files for technical reasons.",
        button: "Accept",
      },
      footer: {
        clause: "All rights reserved",
      },
      error: {
        e404: "The page you're looking for doesn't exist.",
        e500: "Temporary technical error, I'm working on it.",
      },
      seo: {
        home: {
          title: "Agata Hann • Interior Architecture",
          description:
            "Interior design services in Slupsk and surrounding areas. Portfolio of residential and commercial projects. Explore modern apartment and office designs.",
          keywords:
            "interior architecture, interior design, interior architect, interior arrangement, design studio Slupsk, Slupsk, bathroom design, kitchen design",
        },
        projects: {
          title: "Agata Hann • Portfolio",
          description:
            "Explore my latest interior design realizations. From modern apartments to functional office spaces.",
          keywords:
            "architect portfolio, interior realizations, residential projects, office designs",
        },
        contact: {
          title: "Agata Hann • Contact",
          description:
            "Have questions? Need an interior design quote? Get in touch with me. Design studio based in Slupsk.",
          keywords:
            "contact architect, interior design quote, design studio Slupsk",
        },
      },
    },
  },
}));
