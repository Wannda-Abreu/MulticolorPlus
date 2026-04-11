import { benefits, serviceHighlights } from "../../data/site";

export const BenefitsSection = () => (
  <section id="beneficios" className="bg-white">
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      
      <div className="grid gap-16 lg:grid-cols-2">
        
        {/* SERVICIOS */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Servicios
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Compra en tienda, resuelve en el momento
          </h2>

          <div className="mt-10 space-y-6">
            {serviceHighlights.map((item, index) => (
              <div key={item} className="flex items-start gap-4">
                
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {item}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* BENEFICIOS */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Ventajas
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Por qué el cliente compra aquí
          </h3>

          <div className="mt-10 space-y-6">
            {benefits.map((benefit, index) => (
              <div key={benefit} className="flex items-start gap-4">
                
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-700">
                  {index + 1}
                </div>

                <p className="text-base font-medium text-slate-800 leading-relaxed">
                  {benefit}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);
