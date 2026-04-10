import { useEffect, useState } from "react";

const heroImage =
  "https://res.cloudinary.com/dsyfal3wa/image/upload/v1775842173/ChatGPT_Image_10_abr_2026_19_29_09_ojl3yk.png";

const CONTENT_VERSION = "v3";
const CONTENT_VERSION_KEY = "multicolor-content-version";
const CATEGORY_KEY = "multicolor-categories";
const PRODUCT_KEY = "multicolor-products";

type IconKind = "phone" | "tablet" | "headphones" | "shield";
type Tab = "categories" | "products";

type Category = {
  id: string;
  name: string;
  image: string;
  icon: IconKind;
  cardColor: string;
  badgeColor: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
};

const initialCategories: Category[] = [
  { id: "c1", name: "iPhones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80", icon: "phone", cardColor: "#f8ecea", badgeColor: "#ff1636" },
  { id: "c2", name: "Android", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80", icon: "phone", cardColor: "#efedf9", badgeColor: "#7c3aed" },
  { id: "c3", name: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80", icon: "tablet", cardColor: "#e8f0fb", badgeColor: "#2563eb" },
  { id: "c4", name: "Accesorios", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=900&q=80", icon: "shield", cardColor: "#f8efe4", badgeColor: "#f97316" },
  { id: "c5", name: "Audio", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80", icon: "headphones", cardColor: "#f2ebf8", badgeColor: "#b84af4" },
  { id: "c6", name: "Fundas y proteccion", image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=900&q=80", icon: "shield", cardColor: "#e7f5f4", badgeColor: "#0ea5a4" },
];

const initialProducts: Product[] = [
  { id: "p1", name: "iPhone 15 Pro", category: "iPhones", price: "$1,299", description: "Pantalla brillante, camara potente y bateria lista para todo el dia.", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80" },
  { id: "p2", name: "Galaxy S24 Ultra", category: "Android", price: "$1,149", description: "Rendimiento premium con gran autonomia y fotografia avanzada.", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80" },
  { id: "p3", name: "iPad Air", category: "Tablets", price: "$649", description: "Pantalla fluida, formato ligero y perfecta para estudio, trabajo y ocio.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80" },
  { id: "p4", name: "iPhone 14", category: "iPhones", price: "$899", description: "Potencia estable, gran camara y excelente duracion de bateria para uso diario.", image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=900&q=80" },
  { id: "p5", name: "iPhone 13 Reacondicionado", category: "iPhones", price: "$579", description: "Una opcion equilibrada para quien busca Apple a mejor precio.", image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=80" },
  { id: "p6", name: "Galaxy A55", category: "Android", price: "$429", description: "Android equilibrado con buena pantalla, autonomia y camara versatil.", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80" },
  { id: "p7", name: "Xiaomi Redmi Note 13", category: "Android", price: "$299", description: "Ideal para uso diario con gran pantalla y muy buena relacion calidad-precio.", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80" },
  { id: "p8", name: "Samsung Galaxy Z Flip5", category: "Android", price: "$999", description: "Diseño plegable premium para quien busca algo distinto y compacto.", image: "https://images.unsplash.com/photo-1707166682173-a31e58f72d5f?auto=format&fit=crop&w=900&q=80" },
  { id: "p9", name: "iPad 10ª generación", category: "Tablets", price: "$499", description: "Perfecta para estudio, trabajo ligero y entretenimiento en cualquier lugar.", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=80" },
  { id: "p10", name: "Samsung Galaxy Tab S9", category: "Tablets", price: "$799", description: "Pantalla premium y rendimiento fluido para productividad y multimedia.", image: "https://images.unsplash.com/photo-1589739900243-4b52cd9dd174?auto=format&fit=crop&w=900&q=80" },
  { id: "p11", name: "Lenovo Tab M10", category: "Tablets", price: "$229", description: "Tablet accesible para casa, clases, videollamadas y consumo de contenido.", image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=900&q=80" },
  { id: "p12", name: "AirPods Pro", category: "Audio", price: "$249", description: "Cancelacion de ruido y comodidad para musica, llamadas y uso diario.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80" },
  { id: "p13", name: "Galaxy Buds FE", category: "Audio", price: "$109", description: "Auriculares compactos con buen sonido y gran autonomia para llevar siempre.", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80" },
  { id: "p14", name: "JBL Tune 770NC", category: "Audio", price: "$129", description: "Auriculares de diadema con cancelacion de ruido y sonido potente.", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80" },
  { id: "p15", name: "Cargador USB-C 30W", category: "Accesorios", price: "$29", description: "Carga rapida segura para moviles y tablets compatibles.", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80" },
  { id: "p16", name: "Power Bank 20.000 mAh", category: "Accesorios", price: "$39", description: "Bateria externa para salir del paso durante viajes, trabajo o clases.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80" },
  { id: "p17", name: "Cable Lightning reforzado", category: "Accesorios", price: "$14", description: "Cable resistente para carga y datos, pensado para uso intensivo.", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80" },
  { id: "p18", name: "Funda MagSafe iPhone", category: "Fundas y proteccion", price: "$24", description: "Proteccion ligera con buen ajuste y compatibilidad con accesorios MagSafe.", image: "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?auto=format&fit=crop&w=900&q=80" },
  { id: "p19", name: "Cristal templado premium", category: "Fundas y proteccion", price: "$12", description: "Proteccion frontal para evitar golpes y rayones en pantalla.", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80" },
  { id: "p20", name: "Funda rugerizada Samsung", category: "Fundas y proteccion", price: "$19", description: "Mayor agarre y proteccion para el uso diario en calle o trabajo.", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=80" },
];

const benefits = [
  "Atencion directa en el local",
  "Asesoria por WhatsApp en minutos",
  "Garantia y productos verificados",
  "Pagos seguros y cuotas disponibles",
];

const promoHighlights = [
  {
    label: "Hasta -30%",
    title: "Moviles",
    text: "Descuentos en smartphones y reacondicionados seleccionados.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Hasta -20%",
    title: "Tablets",
    text: "Modelos para estudio, trabajo y entretenimiento con stock local.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Desde 9,99€",
    title: "Accesorios",
    text: "Fundas, cargadores y cristales para venta rapida en mostrador.",
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "En tienda",
    title: "Campanas",
    text: "Promociones para atraer trafico al local y cerrar ventas directas.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80",
  },
];

const serviceHighlights = [
  "Recogida en tienda",
  "Cambio de protectores",
  "Garantias y soporte",
  "Asesoria personalizada",
];

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const readCollection = <T,>(key: string, fallback: T[]): T[] => {
  const value = readStorage<T[] | null>(key, null);
  return Array.isArray(value) && value.length > 0 ? value : fallback;
};

const makeId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

function Icon({ kind }: { kind: IconKind }) {
  const common = "h-6 w-6 text-white";
  if (kind === "phone") return <svg viewBox="0 0 24 24" fill="none" className={common}><rect x="7" y="3" width="10" height="18" rx="2.5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="17.5" r="1" fill="currentColor" /></svg>;
  if (kind === "tablet") return <svg viewBox="0 0 24 24" fill="none" className={common}><rect x="5.5" y="3" width="13" height="18" rx="2.2" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="17.5" r="0.9" fill="currentColor" /></svg>;
  if (kind === "headphones") return <svg viewBox="0 0 24 24" fill="none" className={common}><path d="M5 13a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="4" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><rect x="16" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" className={common}><path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m9.5 12 1.7 1.7 3.3-3.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function App() {
  const [categories, setCategories] = useState(() => readCollection(CATEGORY_KEY, initialCategories));
  const [products, setProducts] = useState(() => readCollection(PRODUCT_KEY, initialProducts));
  const [tab, setTab] = useState<Tab>("categories");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [page, setPage] = useState(1);

  const productsPerPage = 6;
  const filteredProducts = products.filter((item) => {
    const matchCategory = selectedCategory === "Todas" || item.category === selectedCategory;
    const query = search.trim().toLowerCase();
    const matchSearch = !query || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  useEffect(() => {
    window.localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    window.localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  useEffect(() => {
    const storedVersion = window.localStorage.getItem(CONTENT_VERSION_KEY);
    const storedCategories = readStorage<Category[] | null>(CATEGORY_KEY, null);
    const storedProducts = readStorage<Product[] | null>(PRODUCT_KEY, null);
    const missingCategories = !Array.isArray(storedCategories) || storedCategories.length === 0;
    const missingProducts = !Array.isArray(storedProducts) || storedProducts.length === 0;

    if (storedVersion !== CONTENT_VERSION || missingCategories || missingProducts) {
      setCategories(initialCategories);
      setProducts(initialProducts);
      window.localStorage.setItem(CONTENT_VERSION_KEY, CONTENT_VERSION);
      window.localStorage.setItem(CATEGORY_KEY, JSON.stringify(initialCategories));
      window.localStorage.setItem(PRODUCT_KEY, JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    if (selectedCategory !== "Todas" && !categories.some((item) => item.name === selectedCategory)) {
      setSelectedCategory("Todas");
    }
  }, [categories, selectedCategory]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f1_0%,#fff3f6_35%,#f7f6ff_68%,#eefcff_100%)] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">M</span>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-950">Multicolor</p>
              <p className="text-sm text-slate-500">Tecnologia que se vende sola</p>
            </div>
          </a>
          <button onClick={() => setOpen((value) => !value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-slate-400">
            {open ? "Cerrar admin" : "Abrir admin"}
          </button>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#fff3ee_0%,#fffaf7_35%,#f5f2ff_68%,#eefcff_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_26%),radial-gradient(circle_at_bottom_center,rgba(34,211,238,0.16),transparent_32%)]" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
            <div className="relative z-10">
              <p className="mb-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">Ofertas activas en moviles, tablets y accesorios</p>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Tecnologia de<br /><span className="text-slate-950">Primera</span> a tu <span className="text-slate-500">Alcance</span></h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">Los mejores moviles, tablets y accesorios con garantia, soporte y atencion directa en tienda. Descubre nuestras ofertas exclusivas.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90">Consultar por WhatsApp</a>
                <a href="#productos" className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-950 transition hover:border-slate-500">Ver Catalogo</a>
              </div>
            </div>
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,245,247,0.9),rgba(245,243,255,0.88))] p-4 shadow-[0_32px_80px_rgba(236,72,153,0.12)]">
                <img src={heroImage} alt="Producto destacado" className="h-full w-full rounded-[1.5rem] object-cover" />
                <div className="absolute bottom-6 left-6 max-w-xs rounded-[1.5rem] border border-slate-200 bg-white/96 p-5 text-slate-950">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Promo del mes</p>
                  <p className="mt-2 text-2xl font-black">Hasta 30% OFF</p>
                  <p className="mt-2 text-sm text-slate-600">En equipos seleccionados con entrega rapida y stock confirmado.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">Campanas destacadas</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">Tu oportunidad de ahorrar</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">Estructura inspirada en retail para un local especializado en moviles, tablets y accesorios.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {promoHighlights.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[1.8rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,247,237,0.92),rgba(245,243,255,0.94))] shadow-[0_20px_50px_rgba(99,102,241,0.07)]">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[1.2/0.9] w-full object-cover transition duration-500 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <a href="#productos" className="mt-5 inline-flex text-sm font-semibold text-red-600 transition hover:text-violet-600">Ver ofertas</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {open ? (
          <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#fff7ed_0%,#fff1f2_42%,#f5f3ff_100%)] text-slate-950">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Dashboard</p>
                  <h2 className="mt-2 text-3xl font-black">Editar categorias y productos</h2>
                  <p className="mt-2 text-sm text-slate-500">Los cambios se guardan en este navegador.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setTab("categories")} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tab === "categories" ? "bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] text-white" : "border border-slate-300 text-slate-700"}`}>Categorias</button>
                  <button onClick={() => setTab("products")} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tab === "products" ? "bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] text-white" : "border border-slate-300 text-slate-700"}`}>Productos</button>
                  <button onClick={() => { setCategories(initialCategories); setProducts(initialProducts); window.localStorage.removeItem(CATEGORY_KEY); window.localStorage.removeItem(PRODUCT_KEY); }} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Restaurar</button>
                </div>
              </div>
              <div className="mt-8 grid gap-5">
                {tab === "categories" ? categories.map((item, index) => (
                  <div key={item.id} className="rounded-[1.5rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,247,237,0.9))] p-5 shadow-[0_20px_50px_rgba(249,115,22,0.08)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-black">Categoria {index + 1}</h3>
                      <button onClick={() => setCategories((current) => current.filter((entry) => entry.id !== item.id))} className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Eliminar</button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input value={item.name} onChange={(e) => setCategories((current) => current.map((entry) => entry.id === item.id ? { ...entry, name: e.target.value } : entry))} placeholder="Nombre" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                      <select value={item.icon} onChange={(e) => setCategories((current) => current.map((entry) => entry.id === item.id ? { ...entry, icon: e.target.value as IconKind } : entry))} className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none"><option value="phone">Phone</option><option value="tablet">Tablet</option><option value="headphones">Headphones</option><option value="shield">Shield</option></select>
                      <input value={item.image} onChange={(e) => setCategories((current) => current.map((entry) => entry.id === item.id ? { ...entry, image: e.target.value } : entry))} placeholder="URL de imagen" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none md:col-span-2" />
                      <input value={item.cardColor} onChange={(e) => setCategories((current) => current.map((entry) => entry.id === item.id ? { ...entry, cardColor: e.target.value } : entry))} placeholder="#f8ecea" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                      <input value={item.badgeColor} onChange={(e) => setCategories((current) => current.map((entry) => entry.id === item.id ? { ...entry, badgeColor: e.target.value } : entry))} placeholder="#ff1636" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                    </div>
                  </div>
                )) : products.map((item, index) => (
                  <div key={item.id} className="rounded-[1.5rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(243,232,255,0.85))] p-5 shadow-[0_20px_50px_rgba(139,92,246,0.08)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-black">Producto {index + 1}</h3>
                      <button onClick={() => setProducts((current) => current.filter((entry) => entry.id !== item.id))} className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Eliminar</button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input value={item.name} onChange={(e) => setProducts((current) => current.map((entry) => entry.id === item.id ? { ...entry, name: e.target.value } : entry))} placeholder="Nombre" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                      <input value={item.category} onChange={(e) => setProducts((current) => current.map((entry) => entry.id === item.id ? { ...entry, category: e.target.value } : entry))} placeholder="Categoria" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                      <input value={item.price} onChange={(e) => setProducts((current) => current.map((entry) => entry.id === item.id ? { ...entry, price: e.target.value } : entry))} placeholder="$0" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                      <input value={item.image} onChange={(e) => setProducts((current) => current.map((entry) => entry.id === item.id ? { ...entry, image: e.target.value } : entry))} placeholder="URL de imagen" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                      <textarea value={item.description} onChange={(e) => setProducts((current) => current.map((entry) => entry.id === item.id ? { ...entry, description: e.target.value } : entry))} rows={4} placeholder="Descripcion" className="rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none md:col-span-2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setCategories((current) => [...current, { id: makeId("c"), name: "Nueva categoria", image: heroImage, icon: "phone", cardColor: "#f3f4f6", badgeColor: "#111827" }])} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tab === "categories" ? "bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] text-white" : "hidden"}`}>Anadir categoria</button>
                <button onClick={() => setProducts((current) => [...current, { id: makeId("p"), name: "Nuevo producto", category: "Categoria", price: "$0", description: "Descripcion editable.", image: heroImage }])} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tab === "products" ? "bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] text-white" : "hidden"}`}>Anadir producto</button>
              </div>
            </div>
          </section>
        ) : null}

        <section id="categorias" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Categorias destacadas</h2>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {categories.map((item) => (
                <article key={item.id} className="group flex flex-col items-center text-center transition duration-300 hover:-translate-y-1">
                  <div className="flex h-44 w-full items-center justify-center rounded-[1.8rem] p-6" style={{ backgroundColor: item.cardColor }}>
                    <img src={item.image} alt={item.name} className="max-h-full w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="mt-6 max-w-[180px] text-[1.05rem] font-black leading-snug tracking-tight text-slate-950">{item.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="productos" className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fff5f7_48%,#f4f6ff_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">Ofertas del dia</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Encuentra tu producto ideal</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] lg:w-[520px]">
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar producto, categoria o descripcion" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-400" />
                <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-400">
                  <option value="Todas">Todas las categorias</option>
                  {categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
              <p>Mostrando {paginatedProducts.length} de {filteredProducts.length} productos</p>
              <p>Pagina {currentPage} de {totalPages}</p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {paginatedProducts.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,245,247,0.92),rgba(244,246,255,0.94))] text-slate-950 shadow-[0_24px_60px_rgba(99,102,241,0.08)]">
                  <img src={item.image} alt={item.name} className="aspect-[1.2/1] w-full object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div><p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.category}</p><h3 className="mt-3 text-2xl font-black">{item.name}</h3></div>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">{item.price}</span>
                    </div>
                    <p className="mt-6 text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Stock local</span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Disponible</span>
                    </div>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">Consultar disponibilidad</a>
                  </div>
                </article>
              ))}
            </div>
            {filteredProducts.length === 0 ? <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-[linear-gradient(135deg,#fff7ed_0%,#f5f3ff_100%)] p-10 text-center text-slate-500">No hay productos que coincidan con la busqueda actual.</div> : null}
            {filteredProducts.length > productsPerPage ? (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition enabled:hover:border-red-300 enabled:hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50">Anterior</button>
                <div className="rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] px-4 py-3 text-sm font-semibold text-white">{currentPage} / {totalPages}</div>
                <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition enabled:hover:border-red-300 enabled:hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50">Siguiente</button>
              </div>
            ) : null}
          </div>
        </section>

        <section id="beneficios" className="bg-[linear-gradient(180deg,#fffaf5_0%,#f8fbff_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,247,237,0.9),rgba(240,249,255,0.94))] p-8 shadow-[0_24px_60px_rgba(14,165,233,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">Servicios</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Compra en tienda, resuelve en el momento</h2>
                <div className="mt-8 space-y-3">
                  {serviceHighlights.map((item, index) => (
                    <div key={item} className="flex items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-white/80 px-4 py-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#f97316_45%,#8b5cf6_100%)] text-sm font-black text-white">0{index + 1}</div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Servicio</p>
                        <p className="text-lg font-bold tracking-tight text-slate-950">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Ventajas</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Por que el cliente compra aqui</h3>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div key={benefit} className="rounded-[1.75rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9),rgba(240,249,255,0.92))] p-6 shadow-[0_18px_50px_rgba(14,165,233,0.06)]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Beneficio clave</p>
                      </div>
                      <p className="mt-4 text-xl font-bold leading-snug text-slate-950">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="border-t border-slate-200 bg-[linear-gradient(135deg,#fff5f7_0%,#f8fbff_100%)] text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Contacto</p></div>
          <div className="space-y-2 text-sm text-slate-600"><p>WhatsApp: +1 234 567 890</p><p>Email: ventas@multicolorplus.com</p><p>Horario: lunes a sabado, 9:00 a 19:00</p></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
