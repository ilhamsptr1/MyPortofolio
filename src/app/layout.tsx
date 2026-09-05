import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KonamiCode from "@/components/KonamiCode";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://myportofolio-nine-pied.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ilham Saputra — Frontend Developer",
    template: "%s | Ilham Saputra",
  },
  description:
    "Portfolio of Ilham Saputra — Informatics student at Universitas Gunadarma specializing in modern web development, React, Next.js, and UI design.",
  keywords: [
    "Ilham Saputra",
    "Frontend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX",
    "Portfolio",
    "Gunadarma",
  ],
  authors: [{ name: "Ilham Saputra", url: BASE_URL }],
  creator: "Ilham Saputra",

  // Open Graph — controls preview on LinkedIn, Facebook, WhatsApp, Slack
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Ilham Saputra — Portfolio",
    title: "Ilham Saputra — Frontend Developer",
    description:
      "Mahasiswa Informatika Universitas Gunadarma yang fokus pada web development modern. React, Next.js, TypeScript, dan UI premium.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ilham Saputra — Frontend Developer Portfolio",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "Ilham Saputra — Frontend Developer",
    description:
      "Portfolio of Ilham Saputra — modern web developer focused on React, Next.js, and clean UI.",
    images: ["/og-image.png"],
    creator: "@ilhammsptra_",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        {/* SmoothScroll activates Lenis globally — single instance, no conflicts */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <KonamiCode />
      </body>
    </html>
  );
}
