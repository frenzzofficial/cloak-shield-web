// The text of the Terms and Privacy pages. It is a plain starting draft that describes what
// this app actually does (see the backend) - have a lawyer review it, and fill `contactEmail`,
// before launch. The pages show the contact line only when it is set.

export const legalConfig = {
  lastUpdated: "2026-10-13",
  contactEmail: "",
} as const;

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const TERMS: LegalDocument = {
  title: "Terms of Service",
  intro:
    "These terms apply when you create an account or use CloakShield Web. By signing up you agree to them.",
  sections: [
    {
      heading: "Your account",
      body: [
        "You must give accurate information and keep your sign-in details private. You are responsible for activity on your account.",
        "Tell us promptly if you think someone else has access to it. You can end all other sessions from your dashboard at any time.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Do not attack, probe or overload the service, try to access other people's accounts, or use it for anything unlawful.",
        "We may limit or suspend an account that puts the service or other users at risk.",
      ],
    },
    {
      heading: "Your data",
      body: [
        "You can change your profile, change your password and delete your account from the dashboard. Deleting your account removes it and its data.",
        "How we handle personal data is described in the Privacy Policy.",
      ],
    },
    {
      heading: "Availability and liability",
      body: [
        "We work to keep the service available and secure, but it is provided as is, without a guarantee of uninterrupted access.",
        "To the extent the law allows, we are not liable for indirect or consequential loss arising from use of the service.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "We may update these terms. When the changes are material we will tell you, and continued use after that means you accept them.",
      ],
    },
  ],
};

export const PRIVACY: LegalDocument = {
  title: "Privacy Policy",
  intro:
    "This explains what personal data CloakShield Web collects when you use it, and why.",
  sections: [
    {
      heading: "What we collect",
      body: [
        "Account details: your name, email address and, if you add them, profile fields such as phone number, username and links.",
        "Security data: a hashed password (never the password itself), the devices and sessions signed in to your account, and a log of security events such as sign-ins, password changes and failed attempts, with the IP address and browser details of each.",
        "If you sign in with Google, we receive your name, email address and profile picture from Google.",
      ],
    },
    {
      heading: "Why we use it",
      body: [
        "To create and secure your account, send the emails you need (verification, password reset, new-device and change notices), detect abuse, and show you your own account activity.",
        "We send marketing email only if you turn that preference on.",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "We use essential cookies to keep you signed in and protect requests from forgery. We do not use advertising cookies.",
      ],
    },
    {
      heading: "Sharing",
      body: [
        "We do not sell your data. It is processed by the providers that run the service, such as hosting, database and email delivery, only to operate it.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can view and edit your profile and preferences, change your email address, sign out other devices and delete your account from the dashboard.",
        "Security logs are kept so you can review account activity and so we can investigate abuse.",
      ],
    },
  ],
};
