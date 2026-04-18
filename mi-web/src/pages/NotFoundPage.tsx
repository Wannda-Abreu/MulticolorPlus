import { Link } from "../lib/router";

export const NotFoundPage = () => (
  <main className="border-b border-slate-200 bg-white">
    <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        404
      </p>
      <h1 className="mt-4 text-5xl font-black text-slate-950">
        Pagina no encontrada
      </h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        La ruta solicitada no existe dentro de este ecommerce.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Volver al inicio
      </Link>
    </div>
  </main>
);
