import type { Metadata } from "next";
import { Syne, Archivo_Black, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://sripavantejbalam.com";

export const metadata: Metadata = {
  title: "Sri Pavan Tej Balam — Software Engineer & Co-Founder, Editco Media",
  description:
    "SDE Intern at NxtWave and Co-Founder of Editco Media. I build full-stack products, AI automations, and digital brands — from award-winning buildathon builds to production MERN applications.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  keywords: [
    "Sri Pavan Tej Balam",
    "Software Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "AI Automation",
    "NxtWave",
    "Editco Media",
    "Portfolio",
  ],
  openGraph: {
    title: "Sri Pavan Tej Balam — Software Engineer & Co-Founder, Editco Media",
    description:
      "SDE Intern at NxtWave and Co-Founder of Editco Media. Full-stack products, AI automations, and growth systems.",
    url: siteUrl,
    siteName: "Sri Pavan Tej Balam",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Pavan Tej Balam — Software Engineer & Co-Founder, Editco Media",
    description:
      "SDE Intern at NxtWave and Co-Founder of Editco Media. Full-stack products, AI automations, and growth systems.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${archivoBlack.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-ink text-white font-inter"
      >
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
