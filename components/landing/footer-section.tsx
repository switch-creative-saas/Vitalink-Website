import { Instagram, Linkedin } from "lucide-react";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import NewsletterForm from "@/components/NewsletterForm";
import { APP_URL, DEMO_URL, LAUNCHED, SIGNUP_URL, WAITLIST_URL } from "@/lib/site-links";
import { SectionContainer } from "./section-container";
import { BackToTopButton } from "./back-to-top-button";
import { VitaLinkLogo } from "./vitalink-logo";

const footerLinks = {
  Product: [
    { name: "Workspace", href: "/#product" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  "Get started": LAUNCHED
    ? [
        { name: "Start free trial", href: SIGNUP_URL },
        { name: "Log in", href: APP_URL },
        { name: "Book a demo", href: DEMO_URL },
        { name: "Patient app waitlist", href: WAITLIST_URL },
      ]
    : [
        { name: "Join waitlist", href: WAITLIST_URL },
        { name: "Book a demo", href: DEMO_URL },
      ],
};

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/vitalink-africa", icon: Linkedin },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vitalink.africa?igsh=MXVxYm10ajI3eHAyeA==",
    icon: Instagram,
  },
];

export function FooterSection() {
  return (
    <footer className="bg-white">
      <SectionContainer className="pt-16 pb-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.6fr] lg:gap-20">
          <div className="min-w-0">
            <a href="/" className="inline-block">
              <VitaLinkLogo size="sm" />
            </a>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Hospital management, patient identity and disease surveillance for healthcare in Nigeria.
            </p>
            <div className="mt-8 rounded-[1.75rem] bg-surface p-5 sm:p-6">
              <p className="text-sm font-medium text-ink">Product updates by email</p>
              <p className="mt-1 text-sm text-muted-foreground">New features and guides, about once a month.</p>
              <div className="mt-4">
                <NewsletterForm variant="inline" placeholder="Your email address" />
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="min-w-0">
                <h3 className="text-sm font-medium text-ink">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="min-w-0">
              <h3 className="text-sm font-medium text-ink">Contact</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:hello@vitalink.africa"
                    className="break-words text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    hello@vitalink.africa
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground/70 transition-colors hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 select-none overflow-hidden" aria-hidden="true">
          <p className="text-[clamp(4rem,19vw,17rem)] font-normal leading-[0.8] tracking-[-0.06em] text-primary">
            VitaLink
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>&copy; {new Date().getFullYear()} VitaLink</p>
            {legalLinks.map((link) => (
              <a key={link.name} href={link.href} className="transition-colors hover:text-foreground">
                {link.name}
              </a>
            ))}
            <CookiePreferencesLink className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground" />
          </div>
          <BackToTopButton />
        </div>
      </SectionContainer>
    </footer>
  );
}
