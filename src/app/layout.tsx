import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KSynapse — AI-Powered ESG Intelligence Platform",
    template: "%s | KSynapse",
  },
  description:
    "Measure, automate, and improve ESG performance with AI-driven carbon accounting, compliance management, sustainability reporting, and actionable insights — all from one intelligent platform.",
  keywords: [
    "ESG", "sustainability", "BRSR", "GRI", "SASB", "TCFD", "CDP",
    "carbon accounting", "compliance", "MSME", "India", "ESG reporting",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ksynapse.com",
    siteName: "KSynapse",
    title: "KSynapse — AI-Powered ESG Intelligence Platform",
    description:
      "Measure, automate, and improve ESG performance with AI-driven carbon accounting, compliance management, and sustainability reporting.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
