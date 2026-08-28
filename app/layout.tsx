import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { buildGlobalSchemaGraph } from "@/lib/schema";
import {
  defaultDescription,
  defaultTitle,
  ogImage,
  siteName,
  siteUrl,
} from "@/lib/site";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  category: "technology",
  applicationName: siteName,
  keywords: [
    "Sri Pavan Tej Balam",
    "Sri Pavan Tej",
    "Software Developer",
    "Full Stack Developer",
    "Entrepreneur",
    "EditCo Media",
    "Editco Media",
    "AI Automation",
    "NxtWave",
    "Portfolio",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-ink text-white font-inter"
      >
        <JsonLd data={buildGlobalSchemaGraph()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000000] focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:border-4 focus:border-ink focus:shadow-[4px_4px_0_0_#0a0a0a]"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
