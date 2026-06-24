import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import { SectionContainer } from "./section-container";
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
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
];

export function FooterSection() {
  return (
    <footer className="bg-white border-t border-border">
      <SectionContainer as="footer" className="py-16 lg:py-20">
        <div id="about" className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-8 min-w-0">
          <div className="col-span-2 min-w-0">
            <a href="/" className="inline-block">
              <VitaLinkLogo size="md" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Africa&apos;s offline-first healthcare infrastructure connecting patients,
              hospitals, and public health systems.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
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
                {title === "Legal" && (
                  <li>
                    <CookiePreferencesLink className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors break-words" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© VitaLink 2026.</p>
          <p>Connecting Healthcare Across Africa.</p>
        </div>
      </SectionContainer>
    </footer>
  );
}
