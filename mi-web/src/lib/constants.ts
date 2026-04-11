export const WHATSAPP_PHONE =
  import.meta.env.VITE_WHATSAPP_PHONE || "1234567890";

// Frontend-only auth. Change this before shipping; it is obfuscation, not real security.
export const ADMIN_PASSWORD = "multicolor-admin-2026";

export const GOOGLE_SHEET_ID =
  import.meta.env.VITE_GOOGLE_SHEET_ID ||
  "1sZfSNrvlMj5jstlgisI7aCG83ilAZIyXFqWl1eSVlzw";

export const GOOGLE_SHEET_GID = import.meta.env.VITE_GOOGLE_SHEET_GID || "0";

export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${GOOGLE_SHEET_GID}`;

export const PRODUCTS_API_URL = (
  import.meta.env.VITE_PRODUCTS_API_URL ||
  import.meta.env.VITE_API_URL ||
  ""
).replace(/\/$/, "");

export const PRODUCT_ITEM_URL_TEMPLATE =
  import.meta.env.VITE_PRODUCT_ITEM_URL || "";

export const WRITE_API_KEY_PARAM_NAME = "apiKey";
export const WRITE_API_KEY_HEADER_NAME = "x-api-key";

export const FAVORITES_STORAGE_KEY = "multicolor-favorites";
export const CART_STORAGE_KEY = "multicolor-cart";
export const ADMIN_SESSION_STORAGE_KEY = "multicolor-admin-session";
export const SITE_CONTENT_STORAGE_KEY = "multicolor-site-content";
