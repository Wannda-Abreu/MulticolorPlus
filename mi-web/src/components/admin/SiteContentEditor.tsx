import type { SiteContent } from "../../types/site-content";

interface SiteContentEditorProps {
  values: SiteContent;
  saving: boolean;
  onPromoChange: (
    index: number,
    field: "label" | "title" | "text" | "image",
    value: string,
  ) => void;
  onCategoryChange: (
    index: number,
    field: "name" | "image",
    value: string,
  ) => void;
  onAddPromo: () => void;
  onRemovePromo: (index: number) => void;
  onAddCategory: () => void;
  onRemoveCategory: (index: number) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const SiteContentEditor = ({
  values,
  saving,
  onPromoChange,
  onCategoryChange,
  onAddPromo,
  onRemovePromo,
  onAddCategory,
  onRemoveCategory,
  onSubmit,
  onReset,
}: SiteContentEditorProps) => (
  <section className="rounded-[2.1rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Home visual
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Categorias y ofertas destacadas
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Edita aqui los bloques visuales de la home. Se guardan en este
          navegador para que puedas cambiar imagenes, titulos y copies sin
          tocar componentes.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
        >
          Restaurar base
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={saving}
          className="rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>

    <div className="mt-8 grid gap-8 xl:grid-cols-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Categorias destacadas
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Nombre e imagen de cada card.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddCategory}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
          >
            Anadir categoria
          </button>
        </div>

        {values.featuredCategories.map((item, index) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-slate-950">
                Categoria {index + 1}
              </strong>
              <button
                type="button"
                onClick={() => onRemoveCategory(index)}
                className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
              >
                Eliminar
              </button>
            </div>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Nombre</span>
              <input
                value={item.name}
                onChange={(event) =>
                  onCategoryChange(index, "name", event.target.value)
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>URL de imagen</span>
              <input
                value={item.image}
                onChange={(event) =>
                  onCategoryChange(index, "image", event.target.value)
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
              />
            </label>
          </article>
        ))}
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Ofertas destacadas
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Edita etiqueta, titulo, descripcion e imagen.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddPromo}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
          >
            Anadir oferta
          </button>
        </div>

        {values.promoHighlights.map((item, index) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-slate-950">
                Oferta {index + 1}
              </strong>
              <button
                type="button"
                onClick={() => onRemovePromo(index)}
                className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
              >
                Eliminar
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                <span>Etiqueta</span>
                <input
                  value={item.label}
                  onChange={(event) =>
                    onPromoChange(index, "label", event.target.value)
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                <span>Titulo</span>
                <input
                  value={item.title}
                  onChange={(event) =>
                    onPromoChange(index, "title", event.target.value)
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Descripcion</span>
              <textarea
                value={item.text}
                onChange={(event) =>
                  onPromoChange(index, "text", event.target.value)
                }
                className="min-h-24 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>URL de imagen</span>
              <input
                value={item.image}
                onChange={(event) =>
                  onPromoChange(index, "image", event.target.value)
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  </section>
);
