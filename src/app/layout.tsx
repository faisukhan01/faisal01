import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NETSOL Technologies — Shaping Smarter Finance",
  description:
    "NETSOL Technologies is a global leader in asset finance and leasing software, providing AI-enabled platforms for lenders, OEMs, dealers, and fleets. Shaping smarter finance across the asset lifecycle.",
  keywords: [
    "NETSOL",
    "asset finance software",
    "leasing software",
    "FinTech",
    "AI-enabled finance",
    "Transcend Platform",
    "digital retail",
    "OEM finance",
    "dealer finance",
    "fleet finance",
  ],
  authors: [{ name: "NETSOL Technologies" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "NETSOL Technologies — Shaping Smarter Finance",
    description:
      "AI-enabled ecosystems that make commerce seamless, intelligent, and connected. Global leader in asset finance and leasing software.",
    siteName: "NETSOL Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NETSOL Technologies — Shaping Smarter Finance",
    description:
      "AI-enabled ecosystems that make commerce seamless, intelligent, and connected.",
  },
};

// JSON-LD structured data for SEO (Organization + WebSite + Product)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://netsoltech.com/#organization",
      name: "NETSOL Technologies",
      alternateName: "NETSOL",
      url: "https://netsoltech.com/",
      logo: "https://netsoltech.com/favicon.svg",
      description:
        "Global leader in asset finance and leasing software, providing AI-enabled platforms for lenders, OEMs, dealers, and fleets.",
      foundingDate: "1997",
      naics: "5112",
      isic: "6202",
      tickerSymbol: "NTWK",
      exchangeName: "NASDAQ",
      address: {
        "@type": "PostalAddress",
        streetAddress: "16000 Ventura Blvd, Suite 770",
        addressLocality: "Encino",
        addressRegion: "CA",
        postalCode: "91436",
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+1-818-222-9195",
          contactType: "sales",
          areaServed: "US",
          availableLanguage: ["English", "Spanish"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/netsol-technologies",
        "https://twitter.com/NETSOLTech",
        "https://www.facebook.com/NETSOLTechnologies",
        "https://www.youtube.com/@NETSOLTechnologies",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://netsoltech.com/#website",
      url: "https://netsoltech.com/",
      name: "NETSOL Technologies",
      publisher: { "@id": "https://netsoltech.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://netsoltech.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Product",
      name: "Transcend Platform",
      description:
        "AI-enabled ecosystem for asset finance — unifies digital retail, finance, AI labs, marketplace, and consultancy on one connected mesh.",
      brand: { "@id": "https://netsoltech.com/#organization" },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "200",
      },
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
        className={`${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
