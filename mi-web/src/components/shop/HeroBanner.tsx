import { Link } from "react-router-dom";

import { heroImage } from "../../data/site";

export const HeroBanner = () => (
  <section
    id="inicio"
    className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#fff3ee_0%,#fffaf7_35%,#f5f2ff_68%,#eefcff_100%)]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_26%),radial-gradient(circle_at_bottom_center,rgba(34,211,238,0.16),transparent_32%)]" />
    <div className="absolute inset-x-0 top-0 h-px bg-white/80" />
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
      <div className="relative z-10">
        <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur">
          Ecommerce conectado a tu catalogo real
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
          Tecnologia de
          <br />
          <span className="text-slate-950">Primera</span> a tu{" "}
          <span className="text-slate-500">Alcance</span>
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
          Todo lo que necesitas a un clic.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700 sm:text-sm">
          <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            Catalogo vivo
          </span>
          <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            Compra asistida
          </span>
          <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            Pedido por WhatsApp
          </span>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#productos"
            className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:opacity-90"
          >
            Ver catalogo
          </a>
          <Link
            to="/checkout"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-950 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
          >
            Ir al checkout
          </Link>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:max-w-xl sm:grid-cols-3">
          <div className="rounded-[1.3rem] border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Rapidez
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              Consulta y cierre en minutos
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Soporte
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              Atencion directa y cercana
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Confianza
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              Productos verificados
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="absolute -left-4 top-10 hidden h-28 w-28 rounded-full bg-cyan-200/50 blur-3xl lg:block" />
        <div className="absolute -right-6 bottom-8 hidden h-28 w-28 rounded-full bg-rose-200/60 blur-3xl lg:block" />
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,245,247,0.9),rgba(245,243,255,0.88))] p-4 shadow-[0_32px_80px_rgba(236,72,153,0.12)]">
          <img
            src={heroImage}
            alt="Producto destacado"
            className="h-full w-full rounded-[1.5rem] object-cover"
          />
          <div className="absolute bottom-7 left-7 rounded-[1.4rem] border border-white/70 bg-white/88 px-4 py-3 shadow-[0_16px_30px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Compra guiada
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              Elige, confirma y cierra sin friccion
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
