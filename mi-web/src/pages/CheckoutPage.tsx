import { useCart } from "../context/CartContext";
import { formatCurrency } from "../lib/format";
import { Link } from "../lib/router";
import { getCheckoutUrl } from "../lib/whatsapp";

export const CheckoutPage = () => {
  const {
    items,
    totalAmount,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <main className="border-b border-slate-200 bg-[linear-gradient(180deg,#fff9f2_0%,#fff8fb_38%,#f4f7ff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Checkout
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Tu carrito, listo para cerrar
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Revisa cantidades, confirma el total y envia tu pedido directo
              por WhatsApp. El flujo sigue simple, pero con una presentacion mas
              limpia y clara.
            </p>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Resumen rapido
              </p>
              <strong className="mt-2 block text-3xl font-black">
                {formatCurrency(totalAmount)}
              </strong>
            </div>
            <div className="flex items-center justify-between text-sm text-white/75">
              <span>Productos</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-white/75">
              <span>Gestion</span>
              <span>WhatsApp</span>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/85 p-8 text-center shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Carrito vacio
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              No hay productos en tu pedido
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Vuelve al catalogo, anade los productos que te interesan y desde
              aqui podras revisar cantidades antes de enviarlo.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
            >
              Volver al catalogo
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_360px]">
            <section className="min-w-0">
              <div className="rounded-[2rem] border border-white/70 bg-white/88 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-6">
                <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                      Carrito
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">
                      {totalItems} articulo{totalItems === 1 ? "" : "s"} en tu
                      pedido
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                    <span className="rounded-full bg-slate-100 px-3 py-2">
                      Confirmacion por WhatsApp
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-2">
                      Ajuste de cantidades en tiempo real
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-4 sm:p-5 lg:grid-cols-[140px_minmax(0,1fr)_auto]"
                >
                    <div className="flex items-center justify-center rounded-[1.5rem] bg-white p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {item.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                        {item.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span>{formatCurrency(item.price)} por unidad</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>Stock disponible: {item.stock}</span>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-blue-500/10 hover:text-blue-600"
                          >
                            -
                          </button>
                          <span className="min-w-10 text-center text-sm font-semibold text-slate-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-blue-500/10 hover:text-blue-600"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
                        >
                          Quitar del carrito
                        </button>
                      </div>
                    </div>
                    <div className="flex min-w-[120px] flex-row items-start justify-between gap-3 border-t border-slate-200 pt-3 sm:flex-col sm:items-end sm:justify-between sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                          Total
                        </p>
                        <strong className="mt-2 block text-2xl font-black text-slate-950">
                          {formatCurrency(item.price * item.quantity)}
                        </strong>
                      </div>
                    </div>
                </article>
              ))}
                </div>
              </div>
            </section>

            <aside className="grid h-fit gap-4 xl:sticky xl:top-28">
              <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Resumen
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Pedido listo
                </h2>

                <div className="mt-8 space-y-4 border-b border-slate-200 pb-6 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4">
                    <span>Articulos</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Gestion del pedido</span>
                    <span>Incluida</span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Total</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-400">
                      Confirmacion manual
                    </p>
                  </div>
                  <strong className="text-4xl font-black tracking-tight text-slate-950">
                    {formatCurrency(totalAmount)}
                  </strong>
                </div>

                <div className="mt-6 grid gap-3">
                  <a
                    href={getCheckoutUrl(items, totalAmount)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Comprar por WhatsApp
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
                  >
                    Seguir comprando
                  </Link>
                  <button
                    onClick={clearCart}
                    className="rounded-full border border-slate-300 px-5 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
                  Despues del click
                </p>
                <div className="mt-5 space-y-4 text-sm leading-6 text-white/80">
                  <p>1. Recibimos tu pedido por WhatsApp y confirmamos stock.</p>
                  <p>2. Cerramos contigo los detalles finales y el pago.</p>
                  <p>3. Te indicamos entrega, recogida o siguiente paso.</p>
                </div>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
