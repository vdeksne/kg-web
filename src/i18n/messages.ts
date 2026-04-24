import type { Locale } from "./config";

export type Messages = {
  meta: {
    titleDefault: string;
    titleTemplate: string;
    description: string;
  };
  nav: {
    about: string;
    portfolio: string;
    contact: string;
  };
  home: {
    heroImageAlt: string;
    sideTextAlt: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    portraitAlt: string;
  };
  portfolio: {
    breadcrumb: string;
    categoryLogo: string;
    tagline: string;
  };
  contact: {
    decorative: string;
    heading: string;
    phoneLabel: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submit: string;
    sent: string;
    error: string;
  };
  footer: {
    tagline: string;
  };
};

const messagesLv: Messages = {
  meta: {
    titleDefault: "Kaspars Groza — Portfolio",
    titleTemplate: "%s — Kaspars Groza",
    description:
      "Grafiskā dizaina portfolio — zīmoli, identitātes un vizuālā komunikācija.",
  },
  nav: {
    about: "Par mani",
    portfolio: "Darbi",
    contact: "Kontakti",
  },
  home: {
    heroImageAlt: "Kaspars Groza — portfolio",
    sideTextAlt: "Kopā varam radīt kaut ko īpašu",
  },
  about: {
    title: "Čau, mani sauc Kaspars",
    p1: "Imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    p2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    portraitAlt: "Kaspars Groza",
  },
  portfolio: {
    breadcrumb: "Darbi",
    categoryLogo: "Logo",
    tagline: "Logo / Dizains / …",
  },
  contact: {
    decorative: "Kopā varam radīt kaut ko īpašu",
    heading: "Kā varu Tev palīdzēt?",
    phoneLabel: "Tel.:",
    nameLabel: "Vārds*",
    emailLabel: "E-pasts*",
    messageLabel: "Uzdod savu jautājumu",
    submit: "Nosūtīt",
    sent: "Paldies — nosūtīts.",
    error: "Neizdevās nosūtīt. Mēģini vēlreiz.",
  },
  footer: {
    tagline: "Nemiz",
  },
};

const messagesEn: Messages = {
  meta: {
    titleDefault: "Kaspars Groza — Portfolio",
    titleTemplate: "%s — Kaspars Groza",
    description:
      "Graphic design portfolio — identities, branding, and visual communication.",
  },
  nav: {
    about: "About",
    portfolio: "Work",
    contact: "Contact",
  },
  home: {
    heroImageAlt: "Kaspars Groza — portfolio",
    sideTextAlt: "Let's create something together",
  },
  about: {
    title: "Hi, I'm Kaspars",
    p1: "Placeholder copy about print and digital design. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    p2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    portraitAlt: "Kaspars Groza",
  },
  portfolio: {
    breadcrumb: "Work",
    categoryLogo: "Logo",
    tagline: "Logo / Design / …",
  },
  contact: {
    decorative: "Let's create something together",
    heading: "How can I help you?",
    phoneLabel: "Tel.:",
    nameLabel: "Name*",
    emailLabel: "Email*",
    messageLabel: "Your message",
    submit: "Send",
    sent: "Thanks — sent.",
    error: "Could not send. Please try again.",
  },
  footer: {
    tagline: "Nemiz",
  },
};

export const messages: Record<Locale, Messages> = {
  lv: messagesLv,
  en: messagesEn,
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
