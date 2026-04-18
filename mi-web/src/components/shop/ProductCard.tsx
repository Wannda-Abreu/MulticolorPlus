import { formatCurrency } from "../../lib/format";
import { getProductInquiryUrl } from "../../lib/whatsapp";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductCardProps) => (
  <article className="group overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(255,245,247,0.94),rgba(244,246,255,0.95))] text-slate-950 shadow-[0_24px_60px_rgba(99,102,241,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(99,102,241,0.12)]">
    <div className="relative">
      <div className="flex aspect-[1.18/1] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,244,246,0.7),rgba(240,244,255,0.9))] p-6">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
        />
      </div>
      {product.oldPrice && product.oldPrice > product.price ? (
        <div className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          Oferta
        </div>
      ) : null}
      <button
        onClick={() => onToggleFavorite(product.id)}
        className={`absolute right-4 top-4 rounded-full px-3 py-2 text-xs font-semibold transition ${
          isFavorite
            ? "bg-blue-500/15 text-blue-700"
            : "bg-white/90 text-slate-700 hover:bg-blue-500/10 hover:text-blue-600"
        }`}
      >
        {isFavorite ? "Guardado" : "Guardar"}
      </button>
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {product.category}
          </p>
          <h3 className="mt-3 text-2xl font-black leading-tight">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          {product.oldPrice ? (
            <span className="block text-xs text-slate-400 line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          ) : null}
          <span className="mt-1 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
      <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
        {product.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
          Rating {product.rating.toFixed(1)}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
          Stock {product.stock}
        </span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => onAddToCart(product)}
          className="rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Anadir al carrito
        </button>
        <a
          href={getProductInquiryUrl(product)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  </article>
);
