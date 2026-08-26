import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FaQ Systems — Intelligent Software & Digital Systems",
  description:
    "FaQ Systems builds intelligent software, automation and digital systems that help modern businesses operate smarter, faster and more efficiently.",
  keywords: [
    "FaQ Systems",
    "software company",
    "SaaS",
    "intelligent software",
    "automation",
    "digital transformation",
    "Concordia",
    "Staffist",
    "startup",
  ],
  authors: [{ name: "FaQ Systems" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "FaQ Systems — Intelligent Software & Digital Systems",
    description:
      "We build intelligent software, automation and digital systems that help modern businesses operate smarter, faster and more efficiently.",
    siteName: "FaQ Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaQ Systems — Intelligent Software & Digital Systems",
    description:
      "Intelligent software, automation and digital systems for modern businesses.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://faq.systems/#organization",
      name: "FaQ Systems",
      url: "https://faq.systems/",
      logo: "https://faq.systems/faq-logo.png",
      description:
        "An intelligent software company building digital systems, automation and SaaS products, run end-to-end by its two founders.",
      founder: [
        { "@type": "Person", name: "Faisal Khan", jobTitle: "Co-Founder, Software Engineer" },
        { "@type": "Person", name: "Abdul Qayyum", jobTitle: "Co-Founder, Software Engineer" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://faq.systems/#website",
      url: "https://faq.systems/",
      name: "FaQ Systems",
      publisher: { "@id": "https://faq.systems/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${plusJakarta.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
