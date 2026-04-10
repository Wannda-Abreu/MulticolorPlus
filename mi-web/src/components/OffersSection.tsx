import { motion } from "motion/react";
import { Zap, Clock, Tag } from "lucide-react";

const offers = [
  {
    title: "Flash Sale",
    subtitle: "Hasta 50% OFF",
    description: "En smartphones seleccionados",
    icon: Zap,
    color: "from-red-600 to-orange-600",
    bgImage: "https://images.unsplash.com/photo-1727093493878-874890b4f9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Oferta del Día",
    subtitle: "Laptops Premium",
    description: "Descuentos especiales hasta agotar stock",
    icon: Clock,
    color: "from-violet-600 to-purple-600",
    bgImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc1MjI5Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Ofertas Especiales",
    subtitle: "Electrodomésticos",
    description: "Precios increíbles en toda la categoría",
    icon: Tag,
    color: "from-blue-600 to-cyan-600",
    bgImage: "https://images.unsplash.com/photo-1740803292374-1b167c1558b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMGtpdGNoZW58ZW58MXx8fHwxNzc1MzIzMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function OffersSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-red-600">Ofertas</span> Imperdibles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprovecha nuestras promociones exclusivas por tiempo limitado
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer h-80"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={offer.bgImage}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-90`}></div>
                </div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <div className="text-3xl font-bold mb-2">{offer.subtitle}</div>
                    <p className="text-white/90">{offer.description}</p>
                  </div>
                  <button className="bg-white text-red-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all font-semibold self-start">
                    Ver Ofertas
                  </button>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
