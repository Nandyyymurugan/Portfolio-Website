import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { defaultMetadata, generatePersonSchema } from "@/lib/metadata";

export const viewport: Viewport = {
  width: 980,
  initialScale: 0.39,
  userScalable: true,
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Nanthini Murugan — Data Analyst & AI Specialist",
  description:
    "Nanthini Murugan — Aspiring Data Analyst & B.Tech AI & Data Science student specializing in Python, SQL, Machine Learning, Data Visualization, and analytical problem-solving.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generatePersonSchema();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <head>
        <meta name="theme-color" content="#09090d" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#09090d] text-[#f1f3f6] antialiased selection:bg-[#ff3b30] selection:text-white min-h-screen flex flex-col relative overflow-x-hidden font-sans">
        {/* Skip to main content accessibility link */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ff3b30] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="top" className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
