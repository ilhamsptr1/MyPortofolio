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

export const metadata: Metadata = {
  title: "Ilham Saputra — Frontend Developer",
  description:
    "Portfolio of Ilham Saputra, an Informatics student at Universitas Gunadarma focused on modern web development and UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* SmoothScroll activates Lenis globally — single instance, no conflicts */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <KonamiCode />
      </body>
    </html>
  );
}
