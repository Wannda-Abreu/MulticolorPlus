import { formatCurrency } from "../../lib/format";
import type { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  deletingProductId: string | null;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductList = ({
  products,
  deletingProductId,
  onEdit,
  onDelete,
}: ProductListProps) => (
  <div className="grid gap-4">
    {products.map((product) => (
      <article
        key={product.id}
        className="grid gap-5 rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] lg:grid-cols-[140px_1fr_auto]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full rounded-[1.5rem] object-cover"
        />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
              {product.category}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Stock {product.stock}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-black text-slate-950">
            {product.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>Precio: {formatCurrency(product.price)}</span>
            {product.oldPrice ? (
              <span>Antes: {formatCurrency(product.oldPrice)}</span>
            ) : null}
            <span>Rating: {product.rating.toFixed(1)}</span>
            <span>ID: {product.id}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onEdit(product)}
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            disabled={deletingProductId === product.id}
            className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingProductId === product.id ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </article>
    ))}
  </div>
);
