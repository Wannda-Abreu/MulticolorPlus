import {
  PRODUCTS_DATA_URL,
  PRODUCTS_STORAGE_KEY,
} from "../lib/constants";
import type { Product, ProductPayload } from "../types/product";

const defaultImageUrl = "https://placehold.co/800x600?text=Producto";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeText = (value: unknown, fallback = "") => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || fallback;
  }

  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value).trim() || fallback;
};

const normalizeNumber = (value: unknown, fallback: number) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeOptionalNumber = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

const createProductId = () =>
  `prod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createTimestamp = () => new Date().toISOString();

const normalizeProduct = (value: unknown, fallbackId?: string): Product => {
  if (!isRecord(value)) {
    throw new Error("El archivo de productos contiene un formato invalido.");
  }

  const id = normalizeText(
    value.id ?? value._id ?? value.ID ?? value.productId ?? fallbackId,
  );

  if (!id) {
    throw new Error("Cada producto debe incluir un campo `id`.");
  }

  return {
    id,
    name: normalizeText(value.name, "Producto sin nombre"),
    price: normalizeNumber(value.price, 0),
    oldPrice: normalizeOptionalNumber(value.oldPrice ?? value.old_price),
    category: normalizeText(value.category, "General"),
    image: normalizeText(value.image, defaultImageUrl),
    description: normalizeText(value.description, "Sin descripcion disponible."),
    stock: normalizeNumber(value.stock, 0),
    rating: normalizeNumber(value.rating, 4.5),
    createdAt: normalizeText(value.createdAt ?? value.created_at) || undefined,
    updatedAt: normalizeText(value.updatedAt ?? value.updated_at) || undefined,
  };
};

const extractProducts = (payload: unknown): Product[] => {
  if (Array.isArray(payload)) {
    return payload.map((entry, index) => normalizeProduct(entry, String(index)));
  }

  if (isRecord(payload) && Array.isArray(payload.products)) {
    return payload.products.map((entry, index) =>
      normalizeProduct(entry, String(index)),
    );
  }

  throw new Error("`products.json` debe contener un array de productos.");
};

const readStoredProducts = (): Product[] | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return extractProducts(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
};

const persistProducts = (products: Product[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

const fetchSeedProducts = async () => {
  const response = await fetch(PRODUCTS_DATA_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(
      "No se pudo cargar `products.json`. Verifica que exista en `mi-web/public/products.json`.",
    );
  }

  return extractProducts((await response.json()) as unknown);
};

const getProductsCollection = async () => {
  const storedProducts = readStoredProducts();

  if (storedProducts) {
    return storedProducts;
  }

  return fetchSeedProducts();
};

const buildProduct = (
  id: string,
  payload: ProductPayload,
  currentProduct?: Product,
): Product => {
  const now = createTimestamp();

  return normalizeProduct({
    ...currentProduct,
    ...payload,
    id,
    createdAt: currentProduct?.createdAt || now,
    updatedAt: now,
  });
};

export const getProducts = async () => {
  return getProductsCollection();
};

export const getProduct = async (id: string) => {
  const products = await getProductsCollection();
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    throw new Error("No se encontro el producto solicitado.");
  }

  return product;
};

export const createProduct = async (payload: ProductPayload) => {
  const products = await getProductsCollection();
  const product = buildProduct(createProductId(), payload);
  const nextProducts = [product, ...products];

  persistProducts(nextProducts);
  return product;
};

export const updateProduct = async (id: string, payload: ProductPayload) => {
  const products = await getProductsCollection();
  const currentProduct = products.find((entry) => entry.id === id);

  if (!currentProduct) {
    throw new Error("No se encontro el producto que intentas editar.");
  }

  const updatedProduct = buildProduct(id, payload, currentProduct);
  const nextProducts = products.map((product) =>
    product.id === id ? updatedProduct : product,
  );

  persistProducts(nextProducts);
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const products = await getProductsCollection();
  const nextProducts = products.filter((product) => product.id !== id);

  if (nextProducts.length === products.length) {
    throw new Error("No se encontro el producto que intentas eliminar.");
  }

  persistProducts(nextProducts);
};

export const resetProducts = async () => {
  const products = await fetchSeedProducts();
  persistProducts(products);
  return products;
};

export const productApi = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  resetProducts,
};
