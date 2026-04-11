import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CatalogFilters } from "../components/shop/CatalogFilters";
import { CategoriesShowcase } from "../components/shop/CategoriesShowcase";
import { HeroBanner } from "../components/shop/HeroBanner";
import { ProductCard } from "../components/shop/ProductCard";
import { PromoGrid } from "../components/shop/PromoGrid";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../hooks/useFavorites";
import { useProducts } from "../hooks/useProducts";
import { useSiteContent } from "../hooks/useSiteContent";

export const HomePage = () => {
  const { products, loading, error, reload } = useProducts();
  const { addToCart, totalItems } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { siteContent } = useSiteContent();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((product) => {
      counts.set(product.category, (counts.get(product.category) || 0) + 1);
    });

    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const featuredCategories = useMemo(() => {
    const counts = new Map(categories.map((entry) => [entry.name, entry.count]));

    return siteContent.featuredCategories
      .filter((item) => item.name.trim())
      .map((item) => ({
        id: item.id,
        name: item.name.trim(),
        image: item.image.trim(),
        count: counts.get(item.name.trim()) || 0,
      }));
  }, [categories, siteContent.featuredCategories]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todas" || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <main>
      <HeroBanner />
      <PromoGrid items={siteContent.promoHighlights} />
      <CategoriesShowcase categories={featuredCategories} />

      <section
        id="productos"
        className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fff5f7_48%,#f4f6ff_100%)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
                Catalogo conectado
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
                Encuentra tu producto ideal
              </h2>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">
                  {products.length} productos activos
                </span>
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">
                  Compra asistida por WhatsApp
                </span>
              </div>
            </div>
            <CatalogFilters
              search={search}
              selectedCategory={selectedCategory}
              categories={categories.map((entry) => entry.name)}
              onSearchChange={setSearch}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-white/70 bg-white/70 px-5 py-4 text-sm text-slate-500 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
            <p>
              Mostrando <span className="font-semibold text-slate-950">{filteredProducts.length}</span>{" "}
              productos
            </p>
            <Link
              to="/checkout"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-500/10 hover:text-blue-600"
            >
              Carrito: {totalItems} items
            </Link>
          </div>

          {loading ? (
            <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500">
              Cargando catalogo...
            </div>
          ) : error ? (
            <div className="mt-10 rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700">
              <p>{error}</p>
              <button
                onClick={reload}
                className="mt-4 rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Reintentar
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-[linear-gradient(135deg,#fff7ed_0%,#f5f3ff_100%)] p-10 text-center text-slate-500">
              No hay productos que coincidan con la busqueda actual.
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isFavorite={isFavorite(product._id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
