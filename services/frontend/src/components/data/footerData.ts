import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export const footerConfig = {
  companyName: "VORMIREX",

  description:
    "Making learning feel like playing. Your AI-powered education companion designed for modern students.",

  socialLinks: [
    {
      icon: FaFacebook,
      url: "https://www.facebook.com/profile.php?id=61584727210742",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/company/vormirex/",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/vormirex/",
    },
  ],

  sections: [
    {
      title: "Quick Links",

      links: [
        {
          label: "Pricing",
          href: "/pricing",
        },
        {
          label: "Features",
          href: "/features",
        },
        {
          label: "AI Chat",
          href: "/ai-chat",
        },
      ],
    },

    {
      title: "Legal",

      links: [
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
        },
        {
          label: "Support",
          href: "/support",
        },
        {
          label: "Help Center",
          href: "/help-center",
        },
      ],
    },

    {
      title: "Get In Touch",

      links: [
        {
          label: "+91 8967838500",
          href: "tel:+918967838500",
        },
        {
          label: "info@vormirex.com",
          href: "mailto:info@vormirex.com",
        },
        {
          label: "AI-Powered Learning Platform",
          href: "#",
        },
      ],
    },
  ],

  copyright: "© 2026 Vormirex. All rights reserved.",
};
