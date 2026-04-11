interface CatalogFiltersProps {
  search: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const CatalogFilters = ({
  search,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: CatalogFiltersProps) => (
  <div className="grid gap-3 rounded-[1.75rem] border border-white/70 bg-white/82 p-3 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:grid-cols-[minmax(0,1fr)_220px] lg:w-[560px]">
    <label className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50/80 px-4 py-3 transition focus-within:border-slate-950 focus-within:bg-white">
      <span className="text-base text-slate-400">⌕</span>
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar producto, categoria o descripcion"
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </label>
    <label className="flex items-center rounded-[1.2rem] border border-slate-200 bg-slate-50/80 px-4 py-3 transition focus-within:border-slate-950 focus-within:bg-white">
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
      >
        <option value="Todas">Todas las categorias</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  </div>
);
