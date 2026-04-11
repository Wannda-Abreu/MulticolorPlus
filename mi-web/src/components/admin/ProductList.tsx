import { formatCurrency } from "../../lib/format";
import type { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  deletingProductId: string | null;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
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
        key={product._id}
        className="grid gap-5 rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92),rgba(244,246,255,0.92))] p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[140px_1fr_auto]"
      >
        <div className="flex items-center justify-center rounded-[1.5rem] bg-white p-4 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-full object-contain"
          />
        </div>
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
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onEdit(product)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(product)}
            disabled={deletingProductId === product._id}
            className="rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingProductId === product._id ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </article>
    ))}
  </div>
);
