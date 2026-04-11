export interface PromoHighlight {
  id: string;
  label: string;
  title: string;
  text: string;
  image: string;
}

export interface FeaturedCategory {
  id: string;
  name: string;
  image: string;
}

export interface SiteContent {
  promoHighlights: PromoHighlight[];
  featuredCategories: FeaturedCategory[];
}
