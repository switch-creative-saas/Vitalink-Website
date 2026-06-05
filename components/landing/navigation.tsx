"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SectionContainer } from "./section-container";
import { VitaLinkLogo } from "./vitalink-logo";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Blog", href: "/blog" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 shadow-md' : 'relative'}`}>
      <SectionContainer as="nav" className="flex items-center justify-between h-16 md:h-[72px]">
        <a href="#" className="shrink-0" onClick={closeMenu}>
          <VitaLinkLogo size="md" />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center shrink-0">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 h-10 font-medium"
            asChild
          >
            <a href="/waitlist">Join Waitlist</a>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </SectionContainer>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <SectionContainer className="py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}
            <Button
              className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-medium"
              asChild
            >
              <a href="/waitlist" onClick={closeMenu}>
                Join Waitlist
              </a>
            </Button>
          </SectionContainer>
        </div>
      )}
    </header>
  );
}
