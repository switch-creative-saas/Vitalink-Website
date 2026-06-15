"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartPulse, Brain, Zap, GraduationCap, Users, Target, BookOpen, Briefcase, MapPin, Clock, Mail, ArrowLeft } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { GlobeBackground } from "@/components/GlobeBackground";

export default function CareersPage() {
  const router = useRouter();

  const whyWorkHere = [
    {
      title: "Mission-Driven Impact",
      description: "Build technology that saves lives and improves healthcare across Africa.",
      icon: HeartPulse,
    },
    {
      title: "Real Healthcare Problems",
      description: "Work on challenges that matter – from disease surveillance to patient access.",
      icon: Target,
    },
    {
      title: "Innovation",
      description: "Build cutting-edge solutions for offline-first, AI-assisted healthcare.",
      icon: Brain,
    },
    {
      title: "Remote-Friendly",
      description: "Flexible work arrangements with opportunities across Africa.",
      icon: Zap,
    },
    {
      title: "Career Growth",
      description: "Clear progression paths and opportunities to take on new challenges.",
      icon: Briefcase,
    },
    {
      title: "Learning & Development",
      description: "Continuous learning opportunities, training, and mentorship programs.",
      icon: GraduationCap,
    },
  ];

  const cultureValues = [
    "Collaboration",
    "Ownership",
    "Integrity",
    "Continuous Learning",
    "Patient-First Thinking",
    "Public Health Impact",
  ];

  const benefits = [
    "Flexible Work Arrangements",
    "Training & Certifications",
    "Healthcare Industry Exposure",
    "Mentorship Programs",
    "Competitive Compensation",
    "Career Advancement Opportunities",
  ];

  const departments = [
    "Engineering",
    "Product",
    "Clinical Operations",
    "Public Health",
    "Sales",
    "Customer Success",
    "Marketing",
    "Partnerships",
    "Operations",
  ];

  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote (Nigeria)",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Lagos, Nigeria",
      type: "Full-time",
    },
    {
      title: "Public Health Analyst",
      department: "Public Health",
      location: "Abuja, Nigeria",
      type: "Full-time",
    },
    {
      title: "Clinical Operations Lead",
      department: "Clinical Operations",
      location: "Remote (Nigeria)",
      type: "Full-time",
    },
    {
      title: "Sales Representative",
      department: "Sales",
      location: "Lagos, Nigeria",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (Nigeria)",
      type: "Full-time",
    },
  ];

  const internships = [
    {
      title: "Public Health Intern",
      department: "Public Health",
      location: "Abuja, Nigeria",
      type: "Internship",
    },
    {
      title: "Software Engineering Intern",
      department: "Engineering",
      location: "Remote (Nigeria)",
      type: "Internship",
    },
    {
      title: "Product Design Intern",
      department: "Product",
      location: "Lagos, Nigeria",
      type: "Internship",
    },
    {
      title: "Data Analyst Intern",
      department: "Data",
      location: "Remote (Nigeria)",
      type: "Internship",
    },
    {
      title: "Community Health Intern",
      department: "Public Health",
      location: "Abuja, Nigeria",
      type: "Internship",
    },
  ];

  const hiringProcess = [
    { step: "1", title: "Application", description: "Submit your application through our portal" },
    { step: "2", title: "Review", description: "Our team reviews your application" },
    { step: "3", title: "Interview", description: "Initial interviews with the hiring team" },
    { step: "4", title: "Assessment", description: "Role-specific assessment or case study" },
    { step: "5", title: "Offer", description: "Welcome to the team!" },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <GlobeBackground />
        <SectionContainer>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Help Build Africa's Healthcare Future
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Join a mission-driven team building healthcare infrastructure that improves lives across Africa.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-medium"
                asChild
              >
                <a href="#open-positions">View Open Roles</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-border text-foreground hover:bg-[#F8FAFC] rounded-xl h-12 px-8 font-medium"
                asChild
              >
                <a href="mailto:careers@vitalink.africa">Contact Recruitment</a>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Why Work at VitaLink */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Work at VitaLink
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a team where your work makes a real difference.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyWorkHere.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-[#F8FAFC] border border-border rounded-xl"
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

      {/* Our Culture */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Culture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The values that define how we work together.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cultureValues.map((value) => (
              <div
                key={value}
                className="p-6 bg-white border border-border rounded-xl text-center"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We invest in our people.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="p-6 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl"
              >
                <p className="text-lg font-semibold text-white">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your next opportunity to make an impact.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button variant="outline" size="sm" className="rounded-full">
              All Departments
            </Button>
            {departments.map((dept) => (
              <Button key={dept} variant="ghost" size="sm" className="rounded-full">
                {dept}
              </Button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="p-6 bg-white border border-border rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button className="rounded-xl" asChild>
                    <a href="mailto:careers@vitalink.africa?subject=Application: {position.title}">
                      Apply Now
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Internships */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Internships
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Launch your career in healthcare technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <div
                key={internship.title}
                className="p-6 bg-[#F8FAFC] border border-border rounded-xl"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {internship.title}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <p className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {internship.department}
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {internship.location}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-xl" asChild>
                  <a href="mailto:careers@vitalink.africa?subject=Internship Application: {internship.title}">
                    Apply
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Hiring Process */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Hiring Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What to expect when you apply.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {hiringProcess.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-white border border-border rounded-xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Diversity Section */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Diversity & Inclusion
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              VitaLink is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#2563EB] to-[#7C3AED]">
        <SectionContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              We're always looking for talented people to join our team. Send us an open application.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#2563EB] hover:bg-white/90 rounded-xl h-12 px-8 font-medium"
              asChild
            >
              <a href="mailto:careers@vitalink.africa?subject=Open Application">
                Send Open Application
              </a>
            </Button>
          </div>
        </SectionContainer>
      </section>
      <FooterSection />
    </main>
  );
}
