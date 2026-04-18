import { useMemo } from "react";

import { useFavorites } from "../hooks/useFavorites";
import { useProducts } from "../hooks/useProducts";
import { formatCurrency } from "../lib/format";
import { getProductInquiryUrl } from "../lib/whatsapp";

export function FeaturedProducts() {
  const { products, loading, error } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();

  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Productos <span className="text-red-600">Destacados</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Seleccion dinamica cargada desde products.json
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Cargando productos destacados...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                    Destacado
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-xs font-semibold transition-colors hover:bg-red-50"
                  >
                    {isFavorite(product.id) ? "Guardado" : "Guardar"}
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-2 text-sm font-semibold text-violet-600">
                    {product.category}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mb-4 text-sm text-gray-500">
                    Rating {product.rating.toFixed(1)} | Stock {product.stock}
                  </div>

                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-red-600">
                      {formatCurrency(product.price)}
                    </span>
                    {product.oldPrice ? (
                      <span className="text-lg text-gray-400 line-through">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    ) : null}
                  </div>

                  <a
                    href={getProductInquiryUrl(product)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 text-white transition-all hover:from-red-700 hover:to-red-800"
                  >
                    <span>Consultar</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="#productos"
            className="inline-flex rounded-xl border-2 border-red-600 bg-white px-8 py-4 font-semibold text-red-600 transition-all hover:bg-red-50"
          >
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  );
}
