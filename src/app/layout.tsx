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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
