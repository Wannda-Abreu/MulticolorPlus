import { useEffect, useMemo, useState, type FormEvent } from "react";

import { productApi } from "../api/products";
import { ProductForm } from "../components/admin/ProductForm";
import { ProductList } from "../components/admin/ProductList";
import { SiteContentEditor } from "../components/admin/SiteContentEditor";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useSiteContent } from "../hooks/useSiteContent";
import {
  emptyProductFormValues,
  type Product,
  type ProductFormValues,
  type ProductPayload,
} from "../types/product";
import type { SiteContent } from "../types/site-content";

const mapProductToForm = (product: Product): ProductFormValues => ({
  name: product.name,
  price: String(product.price),
  category: product.category,
  image: product.image,
  description: product.description,
  stock: String(product.stock),
});

const validateProductForm = (values: ProductFormValues) => {
  const price = Number(values.price);
  const stock = Number(values.stock);

  if (!values.name.trim()) return "El nombre es obligatorio.";
  if (!Number.isFinite(price) || price <= 0) return "El precio debe ser mayor que 0.";
  if (!values.category.trim()) return "La categoria es obligatoria.";
  if (!/^https?:\/\//i.test(values.image.trim())) {
    return "La imagen debe ser una URL valida que empiece por http o https.";
  }
  if (values.description.trim().length < 10) {
    return "La descripcion debe tener al menos 10 caracteres.";
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return "El stock debe ser un numero entero mayor o igual que 0.";
  }

  return "";
};

const mapFormToPayload = (
  values: ProductFormValues,
  currentProduct?: Product,
): ProductPayload => ({
  name: values.name.trim(),
  price: Number(values.price),
  oldPrice: currentProduct?.oldPrice ?? null,
  category: values.category.trim(),
  image: values.image.trim(),
  description: values.description.trim(),
  stock: Number(values.stock),
  rating: currentProduct?.rating ?? 5,
});

export const AdminPage = () => {
  const { logout, writeApiKey } = useAdminAuth();
  const { siteContent, saveSiteContent, resetSiteContent } = useSiteContent();
  const [products, setProducts] = useState<Product[]>([]);
  const [formValues, setFormValues] =
    useState<ProductFormValues>(emptyProductFormValues);
  const [siteContentValues, setSiteContentValues] =
    useState<SiteContent>(siteContent);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savingSiteContent, setSavingSiteContent] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalStock = useMemo(
    () => products.reduce((sum, product) => sum + product.stock, 0),
    [products],
  );
  const editingProduct = useMemo(
    () => products.find((product) => product._id === editingProductId),
    [editingProductId, products],
  );

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await productApi.getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los productos del panel.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setSiteContentValues(siteContent);
  }, [siteContent]);

  const resetForm = () => {
    setEditingProductId(null);
    setFormValues(emptyProductFormValues);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const validationError = validateProductForm(formValues);

      if (validationError) {
        throw new Error(validationError);
      }

      const payload = mapFormToPayload(formValues, editingProduct);
      if (editingProductId) {
        await productApi.updateProduct(editingProductId, payload, writeApiKey);
      } else {
        await productApi.createProduct(payload, writeApiKey);
      }

      await loadProducts();
      setMessage(
        editingProductId
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente.",
      );
      resetForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo guardar el producto.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product._id);
    setFormValues(mapProductToForm(product));
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(
      `Vas a eliminar "${product.name}". Esta accion no se puede deshacer.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingProductId(product._id);
    setError("");
    setMessage("");

    try {
      await productApi.deleteProduct(product._id, writeApiKey);
      await loadProducts();

      if (editingProductId === product._id) {
        resetForm();
      }

      setMessage("Producto eliminado correctamente.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo eliminar el producto.",
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleSaveSiteContent = () => {
    setSavingSiteContent(true);
    setError("");
    setMessage("");

    try {
      saveSiteContent(siteContentValues);
      setMessage("Categorias y ofertas destacadas actualizadas.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar el contenido destacado.",
      );
    } finally {
      setSavingSiteContent(false);
    }
  };

  const handleResetSiteContent = () => {
    resetSiteContent();
    setMessage("Se restauro el contenido visual base.");
    setError("");
  };

  return (
    <main className="border-b border-slate-200 bg-[linear-gradient(135deg,#fff7ed_0%,#fff1f2_42%,#f5f3ff_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <section className="rounded-[2.3rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,247,237,0.94),rgba(245,243,255,0.92))] p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Dashboard
              </p>
              <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                Gestion de productos
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Administra el catalogo, el stock y los bloques visuales de la
                home desde un panel mas limpio y mas claro para el trabajo
                diario.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">
                  CRUD conectado
                </span>
                <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">
                  Google Sheets
                </span>
                <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">
                  Contenido destacado editable
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
            >
              Cerrar sesion
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.7rem] border border-white/80 bg-white/80 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Productos
              </p>
              <strong className="mt-3 block text-4xl font-black text-slate-950">
                {products.length}
              </strong>
              <p className="mt-2 text-sm text-slate-600">
                Items listados en el catalogo actual.
              </p>
            </div>
            <div className="rounded-[1.7rem] border border-white/80 bg-white/80 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Stock total
              </p>
              <strong className="mt-3 block text-4xl font-black text-slate-950">
                {totalStock}
              </strong>
              <p className="mt-2 text-sm text-slate-600">
                Unidades declaradas en todos los productos.
              </p>
            </div>
            <div className="rounded-[1.7rem] border border-white/80 bg-white/80 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                API de escritura
              </p>
              <strong className="mt-3 block text-2xl font-black text-slate-950">
                {writeApiKey ? "Activa" : "Sin clave"}
              </strong>
              <p className="mt-2 text-sm text-slate-600">
                La sesion actual ya tiene permisos de escritura.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ProductForm
            values={formValues}
            editingProductId={editingProductId}
            submitting={submitting}
            onChange={(field, value) =>
              setFormValues((current) => ({ ...current, [field]: value }))
            }
            onSubmit={handleSubmit}
            onReset={resetForm}
          />

          <section className="grid gap-4">
            <div className="rounded-[2.1rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Estado
              </p>
              <div className="mt-4 space-y-3 text-sm">
                {message ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                    {message}
                  </div>
                ) : null}
                {error ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
                    {error}
                  </div>
                ) : null}
                {!message && !error ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600">
                    Usa el formulario para crear o actualizar un producto.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2.1rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Lista
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-950">
                    Productos existentes
                  </h2>
                </div>
                <button
                  onClick={loadProducts}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
                >
                  Recargar
                </button>
              </div>

              <div className="mt-6">
                {loading ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                    Cargando productos...
                  </div>
                ) : products.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    No hay productos guardados todavia.
                  </div>
                ) : (
                  <ProductList
                    products={products}
                    deletingProductId={deletingProductId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </section>
        </section>

        <div className="mt-8">
          <SiteContentEditor
            values={siteContentValues}
            saving={savingSiteContent}
            onPromoChange={(index, field, value) =>
              setSiteContentValues((current) => ({
                ...current,
                promoHighlights: current.promoHighlights.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, [field]: value } : item,
                ),
              }))
            }
            onCategoryChange={(index, field, value) =>
              setSiteContentValues((current) => ({
                ...current,
                featuredCategories: current.featuredCategories.map(
                  (item, itemIndex) =>
                    itemIndex === index ? { ...item, [field]: value } : item,
                ),
              }))
            }
            onAddPromo={() =>
              setSiteContentValues((current) => ({
                ...current,
                promoHighlights: [
                  ...current.promoHighlights,
                  {
                    id: `promo-${Date.now()}`,
                    label: "",
                    title: "",
                    text: "",
                    image: "",
                  },
                ],
              }))
            }
            onRemovePromo={(index) =>
              setSiteContentValues((current) => ({
                ...current,
                promoHighlights: current.promoHighlights.filter(
                  (_, itemIndex) => itemIndex !== index,
                ),
              }))
            }
            onAddCategory={() =>
              setSiteContentValues((current) => ({
                ...current,
                featuredCategories: [
                  ...current.featuredCategories,
                  {
                    id: `featured-${Date.now()}`,
                    name: "",
                    image: "",
                  },
                ],
              }))
            }
            onRemoveCategory={(index) =>
              setSiteContentValues((current) => ({
                ...current,
                featuredCategories: current.featuredCategories.filter(
                  (_, itemIndex) => itemIndex !== index,
                ),
              }))
            }
            onSubmit={handleSaveSiteContent}
            onReset={handleResetSiteContent}
          />
        </div>
      </div>
    </main>
  );
};
