import {
  GOOGLE_SHEET_CSV_URL,
  PRODUCT_ITEM_URL_TEMPLATE,
  PRODUCTS_API_URL,
  WRITE_API_KEY_HEADER_NAME,
  WRITE_API_KEY_PARAM_NAME,
} from "../lib/constants";
import type { Product, ProductPayload } from "../types/product";

const defaultImageUrl = "https://placehold.co/800x600?text=Producto";
const normalizeApiUrl = (url: string) =>
  url.trim().replace(/\/exec(?:-[A-Za-z0-9_-]+)?$/, "/exec").replace(/\/$/, "");

const resolvedProductsApiUrl = normalizeApiUrl(PRODUCTS_API_URL);
const resolvedProductItemUrlTemplate = normalizeApiUrl(PRODUCT_ITEM_URL_TEMPLATE);

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

const assertWriteApiConfigured = () => {
  if (!resolvedProductsApiUrl) {
    throw new Error(
      "La tienda ya lee desde Google Sheets, pero para crear, editar o eliminar necesitas configurar VITE_PRODUCTS_API_URL con un endpoint REST de escritura (Apps Script o Sheet.best).",
    );
  }
};

const isAppsScriptUrl = (url: string) =>
  /https:\/\/script\.google\.com\/macros\/s\//i.test(url);

const buildProductUrl = (id: string) => {
  if (resolvedProductItemUrlTemplate) {
    return resolvedProductItemUrlTemplate.replace(":id", encodeURIComponent(id));
  }

  if (isAppsScriptUrl(resolvedProductsApiUrl)) {
    return `${resolvedProductsApiUrl}?id=${encodeURIComponent(id)}`;
  }

  return `${resolvedProductsApiUrl}/${encodeURIComponent(id)}`;
};

const parseCsv = (csv: string) => {
  const rows: string[][] = [];
  let currentCell = "";
  let currentRow: string[] = [];
  let insideQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const nextChar = csv[index + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      currentRow.push(currentCell);
      rows.push(currentRow);
      currentCell = "";
      currentRow = [];
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows.filter((row) => row.some((cell) => cell.trim() !== ""));
};

const extractProductsFromCsv = (csv: string): Product[] => {
  const rows = parseCsv(csv);

  if (rows.length === 0) {
    return [];
  }

  const [firstRow, ...restRows] = rows;
  const firstCell = (firstRow[0] || "").trim().toLowerCase();
  const hasHeaderRow = firstCell === "id" || firstCell === "_id";

  const headers = hasHeaderRow
    ? firstRow.map((header) => header.trim())
    : [
        "id",
        "name",
        "price",
        "oldPrice",
        "category",
        "image",
        "description",
        "stock",
        "rating",
      ];

  const dataRows = hasHeaderRow ? restRows : rows;

  return dataRows.map((row, index) => {
    const entry = Object.fromEntries(
      headers.map((header, cellIndex) => [header, row[cellIndex] ?? ""]),
    );

    return normalizeProduct(entry, String(index));
  });
};

const buildWriteUrl = (url: string, apiKey: string) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${WRITE_API_KEY_PARAM_NAME}=${encodeURIComponent(apiKey)}`;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const body = await response.json().catch(async () => {
      const text = await response.text().catch(() => "");
      return { message: text || "No se pudo completar la solicitud." };
    });

    throw new Error(body.message || "No se pudo completar la solicitud.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  if (contentType.includes("text/html")) {
    throw new Error(
      "No se pudo leer el Google Sheet. Verifica que la hoja sea publica o compartida correctamente.",
    );
  }

  return response.text() as T;
};

const normalizeProduct = (value: unknown, fallbackId?: string): Product => {
  if (!isRecord(value)) {
    throw new Error("La API de Google Sheets devolvio un producto invalido.");
  }

  const id = normalizeText(
    value._id ?? value.id ?? value.ID ?? value.productId ?? fallbackId,
  );

  if (!id) {
    throw new Error(
      "Cada fila de Google Sheets debe incluir una columna 'id' o '_id'.",
    );
  }

  return {
    _id: id,
    name: normalizeText(value.name, "Producto sin nombre"),
    price: normalizeNumber(value.price, 0),
    oldPrice: normalizeOptionalNumber(value.oldPrice ?? value.old_price),
    category: normalizeText(value.category, "General"),
    image: normalizeText(value.image, defaultImageUrl),
    description: normalizeText(
      value.description,
      "Sin descripcion disponible.",
    ),
    stock: normalizeNumber(value.stock, 0),
    rating: normalizeNumber(value.rating, 5),
    createdAt: normalizeText(value.createdAt ?? value.created_at) || undefined,
    updatedAt: normalizeText(value.updatedAt ?? value.updated_at) || undefined,
  };
};

const extractProducts = (payload: unknown): Product[] => {
  if (typeof payload === "string") {
    return extractProductsFromCsv(payload);
  }

  if (Array.isArray(payload)) {
    return payload.map((entry, index) => normalizeProduct(entry, String(index)));
  }

  if (!isRecord(payload)) {
    throw new Error("La API de Google Sheets devolvio una respuesta invalida.");
  }

  const candidates = [
    payload.products,
    payload.data,
    payload.items,
    payload.rows,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.map((entry, index) =>
        normalizeProduct(entry, String(index)),
      );
    }
  }

  return [normalizeProduct(payload)];
};

const extractMutationProduct = (payload: unknown): Product | null => {
  try {
    const [product] = extractProducts(payload);
    return product || null;
  } catch {
    return null;
  }
};

const extractMutationError = (payload: unknown) => {
  if (typeof payload === "string") {
    const message = payload.trim();

    if (!message || message.toUpperCase() === "OK") {
      return "";
    }

    return message;
  }

  if (isRecord(payload) && typeof payload.message === "string") {
    return payload.message.trim();
  }

  return "";
};

const jsonHeaders = {
  "Content-Type": "application/json",
};

const buildWriteHeaders = (apiKey: string) => ({
  ...jsonHeaders,
  [WRITE_API_KEY_HEADER_NAME]: apiKey,
});

const assertWriteApiKey = (apiKey: string) => {
  const normalizedKey = apiKey.trim();

  if (!normalizedKey) {
    throw new Error("La API_KEY de escritura es obligatoria.");
  }

  return normalizedKey;
};

const performAppsScriptWrite = async (
  action: "create" | "update" | "delete",
  apiKey: string,
  payload: Record<string, unknown>,
) => {
  const separator = resolvedProductsApiUrl.includes("?") ? "&" : "?";
  const baseUrl = `${resolvedProductsApiUrl}${separator}action=${action}`;
  const writeUrl = buildWriteUrl(baseUrl, apiKey);

  const result = await handleResponse<unknown>(
    await fetch(writeUrl, {
      method: "POST",
      // Use a simple CORS request for Apps Script web apps.
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action,
        apiKey,
        ...payload,
      }),
    }),
  );

  const errorMessage = extractMutationError(result);

  if (errorMessage && errorMessage.toUpperCase() !== "OK") {
    throw new Error(errorMessage);
  }

  return result;
};

export const getProducts = async () => {
  // Read from the raw sheet export so product ids stay stable even if Apps Script
  // responses are malformed due to missing headers in the sheet.
  const readUrl = GOOGLE_SHEET_CSV_URL;
  const data = await handleResponse<unknown>(await fetch(readUrl));
  return extractProducts(data);
};

export const getProduct = async (id: string) => {
  const products = await getProducts();
  const product = products.find((entry) => entry._id === id);

  if (!product) {
    throw new Error("No se encontro el producto solicitado.");
  }

  return product;
};

export const createProduct = async (
  payload: ProductPayload,
  apiKey: string,
) => {
  assertWriteApiConfigured();
  const normalizedKey = assertWriteApiKey(apiKey);

  if (isAppsScriptUrl(resolvedProductsApiUrl)) {
    const data = await performAppsScriptWrite("create", normalizedKey, {
      id: createProductId(),
      ...payload,
    });
    return extractMutationProduct(data);
  }

  const data = await handleResponse<unknown>(
    await fetch(buildWriteUrl(resolvedProductsApiUrl, normalizedKey), {
      method: "POST",
      headers: buildWriteHeaders(normalizedKey),
      body: JSON.stringify(payload),
    }),
  );

  return extractMutationProduct(data);
};

export const updateProduct = async (
  id: string,
  payload: ProductPayload,
  apiKey: string,
) => {
  assertWriteApiConfigured();
  const normalizedKey = assertWriteApiKey(apiKey);

  if (isAppsScriptUrl(resolvedProductsApiUrl)) {
    const data = await performAppsScriptWrite("update", normalizedKey, {
      id,
      ...payload,
    });
    return extractMutationProduct(data);
  }

  const data = await handleResponse<unknown>(
    await fetch(buildWriteUrl(buildProductUrl(id), normalizedKey), {
      method: "PUT",
      headers: buildWriteHeaders(normalizedKey),
      body: JSON.stringify({ id, ...payload }),
    }),
  );

  return extractMutationProduct(data);
};

export const deleteProduct = async (id: string, apiKey: string) => {
  assertWriteApiConfigured();
  const normalizedKey = assertWriteApiKey(apiKey);

  if (isAppsScriptUrl(resolvedProductsApiUrl)) {
    await performAppsScriptWrite("delete", normalizedKey, { id });
    return;
  }

  await handleResponse<void>(
    await fetch(buildWriteUrl(buildProductUrl(id), normalizedKey), {
      method: "DELETE",
      headers: buildWriteHeaders(normalizedKey),
      body: JSON.stringify({ id }),
    }),
  );
};

export const productApi = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
