import { categoryPalette } from "../../data/site";

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  image: string;
}

export const CategoriesShowcase = ({
  categories,
}: {
  categories: CategoryItem[];
}) => {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="categorias" className="border-y border-slate-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Categorias destacadas
          </h2>
        </div>
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {categories.map((item, index) => (
          (() => {
            const image =
              item.image.trim() || null;

            return (
              <article
                key={item.id}
                className="group flex flex-col items-center text-center transition duration-300 hover:-translate-y-1"
              >
                <div
                  className="flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
                  style={{
                    backgroundColor:
                      categoryPalette[index % categoryPalette.length],
                  }}
                >
                  {image ? (
                    <div className="relative flex h-full w-full items-center justify-center rounded-[1.55rem] border border-slate-950/8 bg-white/65 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                      <span className="absolute right-3 top-3 rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-white">
                        {item.count}
                      </span>
                      <div className="flex h-full w-full items-center justify-center">
                        <img
                          src={image}
                          alt={item.name}
                          className="h-36 w-full object-contain drop-shadow-[0_14px_22px_rgba(15,23,42,0.14)] transition duration-300 group-hover:scale-[1.06]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.55rem] border border-slate-950/8 bg-white/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Categoria
                        </span>
                      </div>
                      <p className="mt-4 text-2xl font-black text-slate-950">
                        {item.name}
                      </p>
                      <p className="mt-2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-slate-700">
                        {item.count} productos
                      </p>
                    </div>
                  )}
                </div>
                <h3 className="mt-5 max-w-[180px] text-[1.08rem] font-black leading-snug tracking-tight text-slate-950">
                  {item.name}
                </h3>
              </article>
            );
          })()
        ))}
      </div>
    </div>
    </section>
  );
};
