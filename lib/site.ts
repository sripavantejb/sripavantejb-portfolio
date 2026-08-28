import type { Metadata } from "next";
import { profile } from "@/lib/data";

/** Production site URL — used for canonical URLs, sitemap, and Open Graph. */
export const siteUrl = "https://sripavantejb.editcomedia.com";

export const siteName = profile.name;

export const defaultTitle =
  "Sri Pavan Tej Balam — Software Developer, Entrepreneur & Co-Founder of EditCo Media";

export const defaultDescription =
  "Sri Pavan Tej Balam is a software developer, entrepreneur, and Co-Founder of EditCo Media. He builds full-stack products, AI automations, and digital brands.";

/** Open Graph / social sharing image (existing portfolio photo). */
export const ogImage = {
  url: "/images/leadership/media-council-team.jpg",
  width: 2048,
  height: 1536,
  alt: "Portrait of Sri Pavan Tej Balam with the NIAT Media Council team",
};

export const personDescription =
  "Software developer, entrepreneur, and Co-Founder of EditCo Media. SDE Intern at NxtWave building full-stack products, AI automations, and digital brands.";

export const sameAs = [
  profile.linkedin,
  profile.github,
  profile.leetcode,
  profile.npm,
  profile.instagram,
] as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
};

/** Shared metadata builder for indexable pages. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      types: {
        "text/plain": "/llms.txt",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName,
      locale: "en_US",
      type: ogType,
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
      title,
      description,
      images: [ogImage.url],
    },
  };
}
