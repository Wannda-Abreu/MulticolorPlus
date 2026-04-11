import { benefits, contactData, serviceHighlights } from "../../data/site";
import { WHATSAPP_PHONE } from "../../lib/constants";

export const SiteFooter = () => (
  <footer
    id="contacto"
    className="border-t-4 border-slate-200 bg-[#141d33] text-white"
  >
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.9fr_0.9fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Contacto
          </p>
          <h2 className="mt-3 text-3xl font-black text-white">Multicolor Plus</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Catalogo online con carrito, checkout por WhatsApp y una compra mas
            agil tanto en tienda como por mensaje.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
              Compra rapida
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
              Soporte cercano
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
              Oferta activa
            </span>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Servicios
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {serviceHighlights.map((item) => (
              <li key={item}>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-300/40 hover:text-cyan-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Ventajas
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {benefits.map((item) => (
              <li key={item}>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-300/40 hover:text-cyan-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:text-cyan-300"
          >
            WhatsApp: +{WHATSAPP_PHONE}
          </a>
          <a
            href={`mailto:${contactData.email}`}
            className="block rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:text-cyan-300"
          >
            Email: {contactData.email}
          </a>
          <p className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:text-cyan-300">
            Horario: {contactData.schedule}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 text-xs tracking-[0.18em] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
          Multicolor Plus
        </p>
        <p className="text-[11px] uppercase tracking-[0.28em] transition hover:text-cyan-300">
          Compra rapida, soporte cercano y ofertas activas todo el ano.
        </p>
      </div>
    </div>
  </footer>
);
