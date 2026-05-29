export type LandingContent = {
  brand: {
    name: string;
    tagline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  navigation: Array<{ label: string; href: string }>;
  stats: Array<{ label: string; value: string }>;
  featureCards: Array<{
    title: string;
    description: string;
    eyebrow: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  footer: {
    note: string;
    links: Array<{ label: string; href: string }>;
  };
};

export const landingContent: LandingContent = {
  brand: {
    name: "Tiny Link by Mulyawan",
    tagline: "Shorten long URLs instantly without signing in.",
    description:
      "Create clean guest short links from the landing page, switch between dark and read mode, and start from a modular content foundation that is ready for future admin management.",
    ctaPrimary: "Shorten now",
    ctaSecondary: "Explore features",
  },
  navigation: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Get started", href: "#shorten" },
  ],
  stats: [
    { label: "Guest-friendly flow", value: "Instant" },
    { label: "Theme presets", value: "Dark + Read" },
    { label: "Future-ready sections", value: "Config-based" },
  ],
  featureCards: [
    {
      eyebrow: "Guest mode",
      title: "Shorten from the landing page",
      description:
        "Visitors can generate a short link immediately and copy the result without creating an account.",
    },
    {
      eyebrow: "Ephemeral routing",
      title: "Separated from future user data",
      description:
        "Guest links live in an in-memory store with an expiry window, clearly separated from the future account-based storage layer.",
    },
    {
      eyebrow: "Content foundation",
      title: "Landing content is centrally configurable",
      description:
        "Navbar, hero, features, CTA, and footer all read from a single typed content configuration to make future admin tooling straightforward.",
    },
  ],
  steps: [
    {
      title: "Paste a valid URL",
      description:
        "Use the hero form to submit an http or https link you want to shorten.",
    },
    {
      title: "Generate an instant Tiny Link",
      description:
        "The app validates your input, creates a readable code, and stores it in a temporary guest-only registry.",
    },
    {
      title: "Share, copy, and continue",
      description:
        "Use the resulting short URL immediately while the architecture stays ready for login, analytics, QR, and dashboard features later.",
    },
  ],
  cta: {
    title: "Ready to launch the next phases?",
    description:
      "Tahap 1 delivers the responsive landing experience and guest shortener while preparing the codebase for authentication, QR, analytics, and admin CMS capabilities.",
    primary: "Create a guest link",
    secondary: "See roadmap",
  },
  footer: {
    note:
      "Tiny Link by Mulyawan — responsive shortlink foundation with guest shortening, theme preferences, and admin-manageable content groundwork.",
    links: [
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
      { label: "Shorten", href: "#shorten" },
    ],
  },
};
