import { experience, profile } from "@/lib/data";
import {
  ogImage,
  personDescription,
  sameAs,
  siteName,
  siteUrl,
} from "@/lib/site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export function buildPersonSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: siteUrl,
    jobTitle: ["Software Developer", "Entrepreneur", "Co-Founder"],
    description: personDescription,
    image: `${siteUrl}${ogImage.url}`,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: "Editco Media",
      url: profile.editco,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "NxtWave Institute of Advanced Technologies (NIAT)",
    },
    sameAs: [...sameAs],
    knowsAbout: profile.topSkills,
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    description: personDescription,
    publisher: { "@id": personId },
    inLanguage: "en-US",
  };
}

export function buildWebPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en-US",
  };
}

export function buildProfilePageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = `${siteUrl}${path}`;

  return {
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  };
}

export function buildCreativeWorkSchema({
  name,
  description,
  path,
  dateCreated,
  authorName = profile.name,
  keywords,
}: {
  name: string;
  description: string;
  path: string;
  dateCreated?: string;
  authorName?: string;
  keywords?: string[];
}) {
  return {
    "@type": "CreativeWork",
    name,
    description,
    url: `${siteUrl}${path}`,
    author: { "@id": personId, name: authorName },
    creator: { "@id": personId },
    ...(dateCreated ? { dateCreated } : {}),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
  };
}

export function buildJsonLdGraph(
  ...nodes: Record<string, unknown>[]
): { "@context": string; "@graph": Record<string, unknown>[] } {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function buildGlobalSchemaGraph() {
  return buildJsonLdGraph(buildPersonSchema(), buildWebSiteSchema());
}

export function getExperienceSlugs() {
  return experience.map((role) => role.slug);
}
