import type { MetadataRoute } from "next";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "SPTB",
    description: defaultDescription,
    start_url: "/",
    scope: "/",
    id: siteUrl,
    display: "standalone",
    background_color: "#050505",
    theme_color: "#c8f542",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "business", "productivity"],
  };
}
