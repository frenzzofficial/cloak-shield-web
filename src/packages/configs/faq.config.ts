// Every question shown on the /faq page. Add an item here and it appears
// in the accordion; nothing else needs to change. Keep answers plain text: one string is one
// paragraph. The wording describes what this app actually does, so change it when the app changes.

export interface FaqItem {
  /** Stable key, also the anchor: /faq#why-cookies. Never reuse or rename one that is linked. */
  id: string;
  question: string;
  /** One string per paragraph. */
  answer: string[];
}

export interface FaqGroup {
  id: string;
  title: string;
  description?: string;
  items: FaqItem[];
}

export const faqConfig = {
  title: "Frequently asked questions",
  description: "How sign-in, sessions and your account behave, in plain words.",
} as const;

export const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    id: "cookies-sessions",
    title: "Cookies and sessions",
    description:
      "What you will see in your browser's developer tools, and why.",
    items: [
      {
        id: "why-cookies",
        question:
          "Why do I see access, refresh and CSRF cookies in my browser?",
        answer: [
          "Together they are how the app knows you are signed in. The access cookie is a short-lived pass (about 15 minutes) that the browser sends with every request. The refresh cookie is a longer-lived pass that is only sent to the sign-in routes, where it is exchanged for a new access cookie when the old one expires, so you are not asked to sign in every 15 minutes.",
          "The CSRF cookie is a safety check. It protects you from other websites that try to make your browser send requests to this app on your behalf.",
        ],
      },
      {
        id: "js-access",
        question: "Can JavaScript on the page read these cookies?",
        answer: [
          "Not the access and refresh cookies. They are marked HTTP-only, so page scripts cannot read them, even if a bug let someone run a script on the page. Only the browser itself attaches them to requests. Your developer tools can show them because that is your own browser.",
          "Both are also marked Secure (sent over HTTPS only) and SameSite, so they are not sent along with requests started from other sites.",
        ],
      },
      {
        id: "csrf-readable",
        question: "Why can the CSRF cookie be read by JavaScript?",
        answer: [
          "It is meant to be readable. The app copies its value into a request header, and the server only accepts a request when the header and the cookie match. Another website cannot read the cookie, so it cannot build that header.",
          "It is not a sign-in credential and does not identify you, so having it readable does not put your account at risk.",
        ],
      },
      {
        id: "deleted-cookies",
        question: "Why was I signed out when I deleted the cookies?",
        answer: [
          "Without the access cookie the server cannot tell who you are, and without the refresh cookie the app cannot quietly get a new one. So it treats you as signed out and sends you to the sign-in page. This is expected, and the same thing happens when you sign out or your session ends.",
        ],
      },
      {
        id: "stolen-cookies",
        question: "Can someone still misuse my session?",
        answer: [
          "HTTP-only cookies make it much harder to steal a session from the page, but nothing can protect a computer that is already compromised, or one that someone else can use while you are signed in. Sign out on shared computers, keep your browser up to date, and change your password if you think someone has access.",
        ],
      },
    ],
  },
  {
    id: "account-email",
    title: "Email and password",
    items: [
      {
        id: "confirm-email",
        question: "How do I confirm my email address?",
        answer: [
          "Open Confirm Email in Quick Actions on your dashboard and choose Send verification link. Open the link we email you and your account becomes verified. The Account status card shows Unverified until you do.",
        ],
      },
      {
        id: "change-email",
        question: "What happens when I change my email address?",
        answer: [
          "We send a confirmation link to the new address. Your email only changes after you open that link, so a typo cannot lock you out. Until then you keep signing in with the old address.",
        ],
      },
      {
        id: "google-password",
        question: "I signed up with Google. Do I have a password?",
        answer: [
          "No. Google accounts have no password in this app, so there is nothing to type for actions that normally ask for one. You can set a password from Quick Actions if you also want to sign in with email.",
        ],
      },
    ],
  },
  {
    id: "delete-account",
    title: "Deleting your account",
    items: [
      {
        id: "delete-what",
        question: "What happens when I delete my account?",
        answer: [
          "Your account is removed permanently and you are signed out on the spot. It cannot be undone or recovered, so be sure before you confirm.",
        ],
      },
      {
        id: "delete-how",
        question: "How do I delete my account?",
        answer: [
          "Use Delete Account in the Danger Zone on your dashboard. You confirm by entering your password (not needed for Google accounts) and typing DELETE. Cancelling, or closing the window, changes nothing.",
        ],
      },
    ],
  },
];
