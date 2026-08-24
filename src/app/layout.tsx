import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FaQ Systems — Productized SaaS, Built by Founders",
  description:
    "FaQ Systems is a productized software company building focused SaaS products — designed, engineered, and operated end-to-end by its two founders.",
  keywords: [
    "FaQ Systems",
    "SaaS",
    "productized software",
    "software company",
    "FaQ Core",
    "FaQ Toolkit",
    "FaQ Labs",
    "startup",
  ],
  authors: [{ name: "FaQ Systems" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "FaQ Systems — Productized SaaS, Built by Founders",
    description:
      "Small surface, polished detail, honest pricing. SaaS products designed, engineered, and operated by two founders.",
    siteName: "FaQ Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaQ Systems — Productized SaaS, Built by Founders",
    description:
      "Small surface, polished detail, honest pricing. SaaS products built by two founders.",
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
        "A productized software company building focused SaaS products, run end-to-end by its two founders.",
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
        className={`${fraunces.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
