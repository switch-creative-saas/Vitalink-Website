"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Building2, Users, Globe, HeartPulse, Shield, Brain, Activity, Zap, Lock, MapPin, Smartphone, ArrowLeft } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { cn } from "@/lib/utils";
import { trackDemoClick } from "@/lib/analytics";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactStats = [
    { label: "Patients Connected", value: "500K+" },
    { label: "Hospitals Connected", value: "150+" },
    { label: "Countries Served", value: "5+" },
    { label: "Consultations Enabled", value: "1M+" },
    { label: "Disease Signals Monitored", value: "24/7" },
  ];

  const whatWeBuild = [
    {
      title: "VitaCard",
      description: "Offline-first NFC healthcare identity for patients.",
      icon: Shield,
    },
    {
      title: "Patient App",
      description: "Appointments, records, telemedicine, prescriptions, insurance, and personal healthcare management.",
      icon: Smartphone,
    },
    {
      title: "Hospital System",
      description: "EMR, pharmacy, laboratory, billing, inventory, HR, appointments, and analytics.",
      icon: Building2,
    },
    {
      title: "VitaMind AI",
      description: "Clinical intelligence and decision support for healthcare professionals.",
      icon: Brain,
    },
    {
      title: "VitaLink Sentinel",
      description: "Disease surveillance, outbreak intelligence, case reporting, epidemiology, and public health monitoring.",
      icon: Activity,
    },
  ];

  const whoWeServe = [
    { title: "Patients", icon: Users },
    { title: "Healthcare Providers", icon: HeartPulse },
    { title: "Hospitals", icon: Building2 },
    { title: "NGOs", icon: Globe },
    { title: "Governments", icon: Building2 },
    { title: "Public Health Agencies", icon: Activity },
    { title: "Insurance Providers", icon: Shield },
    { title: "Research Institutions", icon: Brain },
  ];

  const coreValues = [
    "Trust",
    "Accessibility",
    "Innovation",
    "Privacy",
    "Equity",
    "Impact",
  ];

  const whyVitaLink = [
    {
      title: "Offline-first Architecture",
      description: "Built for regions with unreliable internet, ensuring healthcare access continues regardless of connectivity.",
      icon: Zap,
    },
    {
      title: "Interoperable Systems",
      description: "Connects disparate healthcare systems into a unified platform for seamless data exchange.",
      icon: Activity,
    },
    {
      title: "AI-Assisted Healthcare",
      description: "Clinical intelligence that supports healthcare professionals in making faster, safer decisions.",
      icon: Brain,
    },
    {
      title: "Public Health Intelligence",
      description: "Real-time disease surveillance and outbreak detection for proactive public health response.",
      icon: Globe,
    },
    {
      title: "Secure Healthcare Identity",
      description: "NFC-based identity system with encryption and privacy-by-design principles.",
      icon: Lock,
    },
    {
      title: "Built for Africa",
      description: "Designed specifically for African healthcare challenges, infrastructure, and regulatory environments.",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="py-4">
        <SectionContainer>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </SectionContainer>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] py-20 lg:py-32">
        <SectionContainer>
          <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Africa's Healthcare Infrastructure
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              VitaLink is an offline-first healthcare operating system connecting patients, healthcare providers, public health agencies, insurers, and governments through a single interoperable platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#2563EB] hover:bg-white/90 rounded-xl h-12 px-8 font-medium"
                asChild
              >
                <a href="#waitlist">Join Waitlist</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-xl h-12 px-8 font-medium"
                onClick={() => trackDemoClick("about_page")}
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why We Built VitaLink
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>Healthcare across Africa remains fragmented.</p>
              <p>Millions of people still depend on paper records.</p>
              <p>Hospitals struggle with disconnected systems.</p>
              <p>Patients lose access to their medical history.</p>
              <p>Public health authorities often lack real-time disease intelligence.</p>
            </div>
            <div className="mt-8 p-6 bg-[#F8FAFC] border border-border rounded-xl">
              <p className="text-lg text-muted-foreground mb-4">
                VitaLink was created to solve these challenges by building the infrastructure layer that healthcare systems need to operate efficiently at scale.
              </p>
              <p className="text-xl font-semibold text-foreground">
                Our goal is simple: Make healthcare connected, accessible, and intelligent for everyone.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To make healthcare accessible, connected, and data-driven by building the digital infrastructure that powers better health outcomes across Africa.
              </p>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become Africa's leading healthcare operating system and the trusted infrastructure powering patient care, public health, and healthcare innovation.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* What We Build */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What We Build
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive healthcare platform designed for the African context.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeBuild.map((item, index) => (
              <div
                key={item.title}
                className="p-6 bg-white border border-border rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Who We Serve */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Who We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering the entire healthcare ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whoWeServe.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white border border-border rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <item.icon className="w-8 h-8 text-[#2563EB] mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreValues.map((value) => (
              <div
                key={value}
                className="p-6 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl text-center"
              >
                <h3 className="text-xl font-semibold text-white">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Our Impact */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Measuring the difference we're making across Africa.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-white border border-border rounded-xl text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-[#2563EB] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Why VitaLink */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why VitaLink
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What sets us apart in healthcare technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyVitaLink.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-[#F8FAFC] border border-border rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-[#2563EB] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Partners Section */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building healthcare infrastructure together.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {["NGOs", "Hospitals", "Government Agencies", "Academic Institutions", "Technology Partners"].map((partner) => (
              <div
                key={partner}
                className="p-8 bg-white border border-border rounded-xl flex items-center justify-center"
              >
                <p className="text-muted-foreground font-medium">
                  {partner}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#2563EB] to-[#7C3AED]">
        <SectionContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Us in Building the Future of Healthcare
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#2563EB] hover:bg-white/90 rounded-xl h-12 px-8 font-medium"
                asChild
              >
                <a href="#waitlist">Join Waitlist</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-xl h-12 px-8 font-medium"
                onClick={() => trackDemoClick("about_page")}
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
