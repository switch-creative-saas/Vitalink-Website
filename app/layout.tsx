import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { CookieConsent } from '@/components/CookieConsent'
import { TawkProvider } from '@/components/providers/TawkProvider'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-instrument'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vitalink.africa'),
  title: {
    default: 'VitaLink | Healthcare Infrastructure Platform for Africa',
    template: '%s | VitaLink',
  },
  description: "VitaLink is building Africa's healthcare operating system — connecting patient identity, EMR, telemedicine, and AI-powered clinical intelligence into one secure platform.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: 'yxQ5QjkGkTC3A47sCgRJcQLP9xa3ecs8NGz-H_OGhko',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'VitaLink',
              alternateName: 'VitaLink Technologies',
              url: 'https://vitalink.africa',
              logo: 'https://vitalink.africa/logo.png',
              description:
                "VitaLink is building Africa's healthcare operating system — connecting patient identity, EMR, telemedicine, and AI-powered clinical intelligence into one secure platform.",
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@vitalink.africa',
                contactType: 'Customer Service',
              },
            }),
          }}
        />
      </head>
      <body className={`${instrumentSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <CookieConsent />
        <TawkProvider />
      </body>
    </html>
  )
}
