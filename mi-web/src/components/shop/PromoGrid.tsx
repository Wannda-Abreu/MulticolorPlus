import type { PromoHighlight } from "../../types/site-content";

export const PromoGrid = ({
  items,
}: {
  items: PromoHighlight[];
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
              Ofertas destacadas
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Tu oportunidad de ahorrar
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Seleccion destacada con acceso rapido a promociones activas y productos con mayor traccion.
            </p>
          </div>
        </div>
        <div className="mt-8 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,#111827_0%,#0b1120_100%)] shadow-[0_16px_34px_rgba(2,6,23,0.36)]"
            >
              <div className="relative overflow-hidden p-2.5">
                <div className="absolute inset-x-4 top-4 h-14 rounded-full bg-white/8 blur-2xl" />
                <div className="relative overflow-hidden rounded-[1.1rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,#151b26_0%,#0b1120_100%)]">
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[1.35/1] w-full object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute bottom-2.5 left-2.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/88 backdrop-blur">
                    {item.title}
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  {item.label}
                </p>
                <p className="mt-2.5 text-sm leading-6 text-white/78">
                  {item.text}
                </p>
                <a
                  href="#productos"
                  className="mt-4 inline-flex rounded-full border border-white/12 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500/10 hover:text-blue-300"
                >
                  Ver ofertas
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
