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
    <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            Ofertas destacadas
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Tu oportunidad de ahorrar
          </h2>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[1.7rem] border border-slate-800 bg-[linear-gradient(180deg,#111827_0%,#0f172a_100%)] shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
          >
            <div className="relative overflow-hidden p-3">
              <div className="absolute inset-x-4 top-4 h-16 rounded-full bg-white/8 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,#151b26_0%,#0b1120_100%)]">
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[1.25/1] w-full object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur">
                  {item.title}
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                {item.text}
              </p>
              <a
                href="#productos"
                className="mt-5 inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500/10 hover:text-blue-300"
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
