import type { SiteContent } from "../types/site-content";

export const heroImage =
  "https://res.cloudinary.com/dsyfal3wa/image/upload/v1775842173/ChatGPT_Image_10_abr_2026_19_29_09_ojl3yk.png";

export const defaultPromoHighlights: SiteContent["promoHighlights"] = [
  {
    id: "promo-1",
    label: "Hasta -30%",
    title: "Moviles",
    text: "Descuentos en moviles y equipos seleccionados para venta rapida en tienda.",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775917892/zona_de_oferta_1080x1080_Post_de_Instagram_-_1_xyba7e.png",
  },
  {
    id: "promo-2",
    label: "Hasta -20%",
    title: "Laptops",
    text: "Laptops para estudio, trabajo y uso diario con stock disponible.",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775917920/zona_de_oferta_1080x1080_Post_de_Instagram_-_2_odjsn8.png",
  },
  {
    id: "promo-3",
    label: "Desde 9,99 EUR",
    title: "iPhones",
    text: "iPhones con promociones destacadas para captar atencion al instante.",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775917920/zona_de_oferta_1080x1080_Post_de_Instagram_-_3_fizkaz.png",
  },
  {
    id: "promo-4",
    label: "En tienda",
    title: "Electrodomesticos",
    text: "Electrodomesticos en oferta para reforzar ventas de ticket medio.",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775917920/zona_de_oferta_1080x1080_Post_de_Instagram_-_5_oai8co.png",
  },
  {
    id: "promo-5",
    label: "Stock rapido",
    title: "Gadgets",
    text: "Gadgets y tecnologia ligera pensados para rotacion rapida y escaparate.",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775917920/zona_de_oferta_1080x1080_Post_de_Instagram_-_6_dx0oky.png",
  },
  {
    id: "promo-6",
    label: "Oferta flash",
    title: "Androids",
    text: "Androids destacados con ofertas listas para impulsar consultas por WhatsApp.",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775917920/zona_de_oferta_1080x1080_Post_de_Instagram_-_4_hu6w0z.png",
  },
];

export const defaultFeaturedCategories: SiteContent["featuredCategories"] = [
  {
    id: "featured-1",
    name: "Moviles",
    image: "",
  },
  {
    id: "featured-2",
    name: "Laptops",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775935621/Captura_de_pantalla_2026-04-11_212646_vqqare.png",
  },
  {
    id: "featured-3",
    name: "iPhones",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775935622/Captura_de_pantalla_2026-04-11_212629_ddmy2f.png",
  },
  {
    id: "featured-4",
    name: "Electrodomesticos",
    image: "",
  },
  {
    id: "featured-5",
    name: "Gadgets",
    image: "",
  },
  {
    id: "featured-6",
    name: "Androids",
    image:
      "https://res.cloudinary.com/dv5s8axrj/image/upload/q_auto/f_auto/v1775935622/Captura_de_pantalla_2026-04-11_212612_mapue4.png",
  },
];

export const defaultSiteContent: SiteContent = {
  promoHighlights: defaultPromoHighlights,
  featuredCategories: defaultFeaturedCategories,
};

export const benefits = [
  "Atencion directa en el local",
  "Asesoria por WhatsApp en minutos",
  "Garantia y productos verificados",
  "Pagos seguros y cuotas disponibles",
];

export const serviceHighlights = [
  "Recogida en tienda",
  "Cambio de protectores",
  "Garantias y soporte",
  "Asesoria personalizada",
];

export const categoryPalette = [
  "#f8ecea",
  "#efedf9",
  "#e8f0fb",
  "#f8efe4",
  "#f2ebf8",
  "#e7f5f4",
];

export const contactData = {
  email: "ventas@multicolorplus.com",
  schedule: "Lunes a sabado, 9:00 a 19:00",
};
