import { Link, NavLink } from "react-router-dom";

import { useCart } from "../../context/CartContext";

export const SiteHeader = () => {
  const { totalItems } = useCart();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "border-blue-200 bg-blue-500/10 text-blue-600 shadow-sm"
        : "border-transparent bg-white text-slate-950"
    } hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-white/80 bg-white/88 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:px-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
              M
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-950">
                Multicolor
              </p>
              <p className="text-xs text-slate-500">
                Tecnologia y venta asistida
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <nav className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 p-1.5">
              <NavLink to="/" end className={linkClass}>
                Inicio
              </NavLink>

              <NavLink to="/checkout" className={linkClass}>
                Checkout
              </NavLink>
            </nav>

            <Link
              to="/checkout"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(15,23,42,0.18)] transition hover:opacity-90"
            >
              <span>Carrito</span>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-black text-slate-950">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
