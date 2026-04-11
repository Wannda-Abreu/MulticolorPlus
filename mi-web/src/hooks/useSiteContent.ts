import { useCallback, useState } from "react";

import { defaultSiteContent } from "../data/site";
import { SITE_CONTENT_STORAGE_KEY } from "../lib/constants";
import type {
  FeaturedCategory,
  PromoHighlight,
  SiteContent,
} from "../types/site-content";

const normalizePromoHighlight = (
  item: Partial<PromoHighlight>,
  index: number,
): PromoHighlight => ({
  id: item.id?.trim() || `promo-${index + 1}`,
  label: item.label?.trim() || "",
  title: item.title?.trim() || "",
  text: item.text?.trim() || "",
  image: item.image?.trim() || "",
});

const normalizeFeaturedCategory = (
  item: Partial<FeaturedCategory>,
  index: number,
): FeaturedCategory => ({
  id: item.id?.trim() || `featured-${index + 1}`,
  name: item.name?.trim() || "",
  image: item.image?.trim() || "",
});

const normalizeSiteContent = (input?: Partial<SiteContent>): SiteContent => ({
  promoHighlights:
    input?.promoHighlights !== undefined
      ? input.promoHighlights.map(normalizePromoHighlight)
      : defaultSiteContent.promoHighlights,
  featuredCategories:
    input?.featuredCategories !== undefined
      ? input.featuredCategories.map(normalizeFeaturedCategory)
      : defaultSiteContent.featuredCategories,
});

const readSiteContent = (): SiteContent => {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }

  try {
    const raw = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);

    if (!raw) {
      return defaultSiteContent;
    }

    return normalizeSiteContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return defaultSiteContent;
  }
};

const persistSiteContent = (content: SiteContent) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SITE_CONTENT_STORAGE_KEY,
    JSON.stringify(content),
  );
};

export const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() =>
    readSiteContent(),
  );

  const saveSiteContent = useCallback((content: SiteContent) => {
    const normalized = normalizeSiteContent(content);
    setSiteContent(normalized);
    persistSiteContent(normalized);
  }, []);

  const resetSiteContent = useCallback(() => {
    setSiteContent(defaultSiteContent);
    persistSiteContent(defaultSiteContent);
  }, []);

  return {
    siteContent,
    saveSiteContent,
    resetSiteContent,
  };
};
