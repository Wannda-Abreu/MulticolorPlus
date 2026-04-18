import type { FormEvent } from "react";

import type { ProductFormValues } from "../../types/product";

interface ProductFormProps {
  values: ProductFormValues;
  editingProductId: string | null;
  submitting: boolean;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

const fields: Array<{
  key: keyof ProductFormValues;
  label: string;
  type?: string;
  required?: boolean;
}> = [
  { key: "name", label: "Nombre" },
  { key: "price", label: "Precio", type: "number" },
  { key: "oldPrice", label: "Precio anterior", type: "number", required: false },
  { key: "category", label: "Categoria" },
  { key: "image", label: "URL de imagen" },
  { key: "stock", label: "Stock", type: "number" },
  { key: "rating", label: "Rating", type: "number", required: false },
];

export const ProductForm = ({
  values,
  editingProductId,
  submitting,
  onChange,
  onSubmit,
  onReset,
}: ProductFormProps) => (
  <form
    onSubmit={onSubmit}
    className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,247,237,0.92),rgba(245,243,255,0.9))] p-6 shadow-[0_24px_60px_rgba(99,102,241,0.08)]"
  >
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Formulario
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          {editingProductId ? "Editar producto" : "Crear producto"}
        </h2>
      </div>
      {editingProductId ? (
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Cancelar
        </button>
      ) : null}
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field.key} className="grid gap-2 text-sm font-medium text-slate-700">
          <span>{field.label}</span>
          <input
            type={field.type || "text"}
            value={values[field.key]}
            onChange={(event) => onChange(field.key, event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
            required={field.required !== false}
            step={field.type === "number" ? "0.1" : undefined}
            min={field.type === "number" ? "0" : undefined}
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
        <span>Descripcion</span>
        <textarea
          value={values.description}
          onChange={(event) => onChange("description", event.target.value)}
          className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
          required
        />
      </label>
    </div>

    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="submit"
        disabled={submitting}
        className="rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? "Guardando..."
          : editingProductId
            ? "Actualizar producto"
            : "Crear producto"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
      >
        Limpiar
      </button>
    </div>
  </form>
);
