import { Instagram, Linkedin } from "lucide-react";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import NewsletterForm from "@/components/NewsletterForm";
import { SectionContainer } from "./section-container";
import { BackToTopButton } from "./back-to-top-button";
import { VitaLinkLogo } from "./vitalink-logo";

const footerLinks = {
  Company: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  Platform: [
    { name: "VitaCard", href: "#features" },
    { name: "Patient App", href: "#features" },
    { name: "VitaMind AI", href: "#vitamind" },
    { name: "VitaLink Sentinel", href: "#solutions" },
  ],
  Solutions: [
    { name: "Hospitals", href: "#pricing" },
    { name: "NGOs", href: "#solutions" },
    { name: "Government", href: "#solutions" },
    { name: "Public Health", href: "#solutions" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/vitalink-africa", icon: Linkedin },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vitalink.africa?igsh=MXVxYm10ajI3eHAyeA==",
    icon: Instagram,
  },
];

export function FooterSection() {
  const { Legal, ...mainFooterLinks } = footerLinks;

  return (
    <footer className="relative overflow-hidden bg-white border-t border-border">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.08),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(37,99,235,0.08),transparent_24%)]" />

      <SectionContainer className="relative py-12 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-5 border-b border-border pb-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <a href="/" className="inline-block">
            <VitaLinkLogo size="md" />
          </a>
          <p className="max-w-sm text-left md:text-center">
            Connecting Healthcare Across Africa.
          </p>
          <p className="md:text-right">&copy; VitaLink 2026.</p>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-5 text-white shadow-2xl shadow-indigo-950/15 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                  <VitaLinkLogo showText={false} size="lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                    Newsletter
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Get VitaLink updates
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100">
                    Africa&apos;s offline-first healthcare infrastructure connecting patients,
                    hospitals, and public health systems.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <NewsletterForm variant="blog" placeholder="Your email address" />
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@vitalink.africa"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors break-words"
                  >
                    hello@vitalink.africa
                  </a>
                </li>
              </ul>
            </div>

            {Object.entries(mainFooterLinks).map(([title, links]) => (
              <div key={title} className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors break-words"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-4">Social</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-100 bg-white/75 text-[#4338CA] shadow-sm backdrop-blur-sm transition-colors hover:border-[#2563EB]/40 hover:bg-[#EEF2FF] hover:text-[#2563EB]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border py-6">
          {Legal.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
          <CookiePreferencesLink className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors" />
        </div>

        <div className="select-none border-y border-border py-8 sm:py-10">
          <p className="text-[clamp(4.5rem,18vw,15rem)] font-black leading-[0.78] tracking-tight text-indigo-950">
            VitaLink
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <p>&copy; VitaLink 2026.</p>
            <span className="hidden sm:inline" aria-hidden="true">
              /
            </span>
            <p>Connecting Healthcare Across Africa.</p>
          </div>
          <BackToTopButton />
        </div>
      </SectionContainer>
    </footer>
  );
}
