"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Clock, Calendar, Building2, Users, Globe, HeartPulse, Shield, Activity, HelpCircle, ArrowLeft } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { trackDemoClick } from "@/lib/analytics";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactCards = [
    {
      title: "General",
      email: "hello@vitalink.africa",
      icon: Mail,
    },
    {
      title: "Partnerships",
      email: "partnerships@vitalink.africa",
      icon: Users,
    },
    {
      title: "Support",
      email: "support@vitalink.africa",
      icon: HelpCircle,
    },
    {
      title: "Investors",
      email: "investors@vitalink.africa",
      icon: Building2,
    },
    {
      title: "Privacy",
      email: "privacy@vitalink.africa",
      icon: Shield,
    },
    {
      title: "Legal",
      email: "legal@vitalink.africa",
      icon: Activity,
    },
    {
      title: "Careers",
      email: "careers@vitalink.africa",
      icon: Globe,
    },
  ];

  const faqs = [
    {
      question: "How do I join the waitlist?",
      answer: "You can join the waitlist by clicking the 'Join Waitlist' button on our homepage or by filling out the contact form with 'Join Waitlist' as your subject.",
    },
    {
      question: "How do hospitals onboard?",
      answer: "Hospitals can onboard by contacting our partnerships team. We'll schedule a demo, discuss your needs, and guide you through the implementation process.",
    },
    {
      question: "How does VitaCard work?",
      answer: "VitaCard is an NFC-based healthcare identity card that stores secure identifiers linked to your encrypted medical records. It enables offline access to critical health information.",
    },
    {
      question: "How does VitaMind AI work?",
      answer: "VitaMind AI provides clinical decision support to healthcare professionals. It analyzes patient data to offer insights and recommendations that must be reviewed by licensed practitioners.",
    },
    {
      question: "How can NGOs use VitaLink Sentinel?",
      answer: "NGOs can use VitaLink Sentinel to access anonymized disease surveillance data, track health interventions, and coordinate public health initiatives with government agencies.",
    },
    {
      question: "How can governments partner with VitaLink?",
      answer: "Governments can partner with VitaLink to implement national health identity systems, disease surveillance networks, and integrated healthcare platforms for public health management.",
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Get In Touch
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Whether you're a patient, hospital, NGO, government agency, investor, or partner, we'd love to hear from you.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Contact Form */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="Your organization"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    placeholder="Nigeria"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="">Select an inquiry type</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Hospital Partnership">Hospital Partnership</option>
                    <option value="Government Partnership">Government Partnership</option>
                    <option value="NGO Partnership">NGO Partnership</option>
                    <option value="Investor Relations">Investor Relations</option>
                    <option value="Media Inquiry">Media Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Careers">Careers</option>
                    <option value="Product Demo">Product Demo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl h-12 px-8 font-medium"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Cards */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="grid gap-4">
                {contactCards.map((card) => (
                  <a
                    key={card.title}
                    href={`mailto:${card.email}`}
                    className="p-4 bg-[#F8FAFC] border border-border rounded-lg hover:shadow-md transition-shadow flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shrink-0">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{card.title}</p>
                      <p className="text-sm text-muted-foreground">{card.email}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Book a Demo */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Book a Demo
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hospitals and healthcare organizations can schedule a personalized VitaLink demonstration.
            </p>
            <Button
              size="lg"
              className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl h-12 px-8 font-medium"
              asChild
            >
              <a href="mailto:partnerships@vitalink.africa?subject=Demo Request">
                Schedule Demo
              </a>
            </Button>
          </div>
        </SectionContainer>
      </section>

      {/* Office Section */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Our Office
            </h2>
            <div className="p-8 bg-[#F8FAFC] border border-border rounded-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Headquarters
                  </h3>
                  <p className="text-muted-foreground">
                    Abuja, Nigeria
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Future expansion locations coming soon across Africa.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Map Section */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Find Us
            </h2>
            <div className="aspect-video bg-[#E2E8F0] border border-border rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Support Hours */}
      <section className="py-20 lg:py-28 bg-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Support Hours
            </h2>
            <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground">
              <Clock className="w-6 h-6" />
              <p>Monday – Friday: 9:00 AM – 6:00 PM WAT</p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-border rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#2563EB] to-[#7C3AED]">
        <SectionContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Let's Build Better Healthcare Together
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
                onClick={() => trackDemoClick("contact_page")}
                asChild
              >
                <a href="mailto:partnerships@vitalink.africa?subject=Demo Request">Request Demo</a>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
