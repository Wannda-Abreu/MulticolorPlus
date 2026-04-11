import { useState, type FormEvent } from "react";

import { useAdminAuth } from "../../context/AdminAuthContext";

export const AdminLoginCard = () => {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [writeApiKey, setWriteApiKey] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      login(password, writeApiKey);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesion.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="border-b border-slate-200 bg-[linear-gradient(135deg,#fff7ed_0%,#fff1f2_42%,#f5f3ff_100%)] text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl items-center px-4 py-12 sm:px-6">
        <section className="grid w-full gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2.4rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,247,237,0.94),rgba(245,243,255,0.92))] p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)]">
                M
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-slate-950">
                  Multicolor
                </p>
                <p className="text-xs text-slate-500">Panel protegido</p>
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
              Acceso restringido
            </p>
            <h1 className="mt-4 text-4xl font-black text-slate-950">
              Panel admin
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Inicia sesion para editar productos y enviar escrituras seguras a
              Google Sheets. La API_KEY de escritura se guarda solo en la sesion
              local del navegador.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-sm">
                GET sigue siendo publico para la tienda.
              </div>
              <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-sm">
                POST, PUT y DELETE exigen la clave de escritura del admin.
              </div>
              <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-amber-800 shadow-sm">
                La contrasena fija en frontend sirve solo como barrera basica.
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2.4rem] border border-white/70 bg-white/95 p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-10"
          >
            <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Login admin
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
              Accede al editor
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Introduce la contrasena del panel y la clave de escritura para
                activar cambios sobre productos y contenido destacado.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                <span>Contrasena admin</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                  placeholder="Introduce la contrasena"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                <span>API_KEY de escritura</span>
                <input
                  type="password"
                  value={writeApiKey}
                  onChange={(event) => setWriteApiKey(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                  placeholder="Clave para POST, PUT y DELETE"
                  required
                />
              </label>
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Validando..." : "Entrar al panel"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
