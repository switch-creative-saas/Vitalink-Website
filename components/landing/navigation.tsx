"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_URL, LAUNCHED, SIGNUP_LABEL, SIGNUP_URL } from "@/lib/site-links";
import { SectionContainer } from "./section-container";
import { VitaLinkLogo } from "./vitalink-logo";

const navLinks = [
  { name: "Product", href: "/#product" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Pricing", href: "/#pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();

    if (!href.startsWith("/#") || window.location.pathname !== "/") {
      return;
    }

    const target = document.getElementById(href.slice(2));

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", href);
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 88,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-white/85 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      )}
    >
      <SectionContainer as="nav" className="flex items-center justify-between gap-6 h-16 md:h-[76px]">
        <a href="/" className="shrink-0" onClick={closeMenu}>
          <VitaLinkLogo size="sm" />
        </a>

        <div className="hidden lg:flex items-center gap-1 rounded-full bg-surface p-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-foreground/70 transition-colors hover:bg-white hover:text-foreground"
              onClick={(event) => handleNavClick(event, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {LAUNCHED && (
            <a
              href={APP_URL}
              className="px-4 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Log in
            </a>
          )}
          <a
            href={SIGNUP_URL}
            className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-primary"
          >
            {SIGNUP_LABEL}
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden -mr-2 p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </SectionContainer>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <SectionContainer className="py-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-3 text-base font-medium text-foreground border-b border-black/5"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.name}
              </a>
            ))}
            <div className={cn("mt-5 grid gap-3", LAUNCHED && "grid-cols-2")}>
              {LAUNCHED && (
                <a
                  href={APP_URL}
                  onClick={closeMenu}
                  className="rounded-full border border-border py-3 text-center text-sm font-medium text-foreground"
                >
                  Log in
                </a>
              )}
              <a
                href={SIGNUP_URL}
                onClick={closeMenu}
                className="rounded-full bg-ink py-3 text-center text-sm font-medium text-white"
              >
                {SIGNUP_LABEL}
              </a>
            </div>
          </SectionContainer>
        </div>
      )}
    </header>
  );
}
