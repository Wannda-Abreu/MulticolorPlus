import { useState, type FormEvent } from "react";

import { AdminPage } from "./AdminPage";
import { ADMIN_AUTH_STORAGE_KEY } from "../lib/constants";

const ADMIN_USERNAME = "multicolor-admin-2026";
const ADMIN_PASSWORD = "mi_clave_secreta_08090706";

const readAdminSession = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "true";
};

const persistAdminSession = (authenticated: boolean) => {
  if (typeof window === "undefined") {
    return;
  }

  if (authenticated) {
    window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
    return;
  }

  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};

export const AdminAccessPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => readAdminSession());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      persistAdminSession(true);
      setIsAuthenticated(true);
      setError("");
      setPassword("");
      return;
    }

    setError("Usuario o contrasena incorrectos.");
  };

  const handleLogout = () => {
    persistAdminSession(false);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="border-b border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 text-sm sm:px-6">
            <p className="font-semibold tracking-[0.18em] text-slate-200">
              Acceso administrador activo
            </p>
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/20 px-4 py-2 font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
        <AdminPage />
      </>
    );
  }

  return (
    <main className="border-b border-slate-200 bg-[linear-gradient(145deg,#fff7ed_0%,#fff1f2_42%,#f5f3ff_100%)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/70 bg-white/92 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.10)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">
            Acceso restringido
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Introduce tus credenciales para abrir el panel de administracion.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Usuario</span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
                autoComplete="username"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Contrasena</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Entrar al administrador
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
