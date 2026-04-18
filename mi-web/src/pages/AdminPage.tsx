import { useEffect, useMemo, useState, type FormEvent } from "react";

import { productApi } from "../api/products";
import { ProductForm } from "../components/admin/ProductForm";
import { ProductList } from "../components/admin/ProductList";
import {
  emptyProductFormValues,
  type Product,
  type ProductFormValues,
  type ProductPayload,
} from "../types/product";

const mapProductToForm = (product: Product): ProductFormValues => ({
  name: product.name,
  price: String(product.price),
  oldPrice: product.oldPrice ? String(product.oldPrice) : "",
  category: product.category,
  image: product.image,
  description: product.description,
  stock: String(product.stock),
  rating: String(product.rating),
});

const mapFormToPayload = (values: ProductFormValues): ProductPayload => ({
  name: values.name.trim(),
  price: Number(values.price),
  oldPrice: values.oldPrice ? Number(values.oldPrice) : null,
  category: values.category.trim(),
  image: values.image.trim(),
  description: values.description.trim(),
  stock: Number(values.stock),
  rating: values.rating ? Number(values.rating) : 4.5,
});

export const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formValues, setFormValues] =
    useState<ProductFormValues>(emptyProductFormValues);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalStock = useMemo(
    () => products.reduce((sum, product) => sum + product.stock, 0),
    [products],
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
          : "No se pudieron cargar los productos.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
      const payload = mapFormToPayload(formValues);

      if (editingProductId) {
        await productApi.updateProduct(editingProductId, payload);
        setMessage("Producto actualizado correctamente.");
      } else {
        await productApi.createProduct(payload);
        setMessage("Producto creado correctamente.");
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar el producto.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormValues(mapProductToForm(product));
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId: string) => {
    const currentProduct = products.find((product) => product.id === productId);
    const confirmed = window.confirm(
      `Vas a eliminar "${currentProduct?.name || "este producto"}". Esta accion no se puede deshacer.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingProductId(productId);
    setError("");
    setMessage("");

    try {
      await productApi.deleteProduct(productId);
      if (editingProductId === productId) {
        resetForm();
      }
      setMessage("Producto eliminado correctamente.");
      await loadProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo eliminar el producto.",
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleResetCatalog = async () => {
    const confirmed = window.confirm(
      "Se restaurara el catalogo base de `products.json` y se perderan los cambios guardados en este navegador.",
    );

    if (!confirmed) {
      return;
    }

    setResetting(true);
    setError("");
    setMessage("");

    try {
      await productApi.resetProducts();
      if (editingProductId) {
        resetForm();
      }
      setMessage("Catalogo restaurado desde products.json.");
      await loadProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo restaurar el catalogo.",
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <main className="border-b border-slate-200 bg-[linear-gradient(135deg,#fff7ed_0%,#fff1f2_42%,#f5f3ff_100%)] text-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Admin
            </p>
            <h1 className="mt-2 text-4xl font-black">
              CRUD local con products.json
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              El catalogo se carga desde <code>products.json</code> y los
              cambios del admin se guardan en este navegador con{" "}
              <code>localStorage</code>. Es compatible con GitHub Pages.
            </p>
          </div>
          <div className="grid min-w-56 gap-3 rounded-[1.75rem] border border-white/70 bg-white/90 p-5 text-sm shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Productos</span>
              <strong className="text-xl text-slate-950">{products.length}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Stock total</span>
              <strong className="text-xl text-slate-950">{totalStock}</strong>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
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
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
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
                    Panel listo para crear, editar y eliminar productos.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Lista
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-950">
                    Productos guardados
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={loadProducts}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    Recargar
                  </button>
                  <button
                    onClick={handleResetCatalog}
                    disabled={resetting}
                    className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resetting ? "Restaurando..." : "Restaurar base"}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                {loading ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                    Cargando productos...
                  </div>
                ) : products.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    No hay productos disponibles.
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
        </div>
      </div>
    </main>
  );
};
