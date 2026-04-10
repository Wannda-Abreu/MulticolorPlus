import { motion } from "motion/react";
import { MessageCircle, ArrowRight } from "lucide-react";

export function HeroSection() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-violet-50 overflow-hidden">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="#dc2626" />
            <line x1="50" y1="50" x2="80" y2="50" stroke="#dc2626" strokeWidth="1" />
            <line x1="50" y1="50" x2="50" y2="80" stroke="#dc2626" strokeWidth="1" />
            <circle cx="80" cy="50" r="2" fill="#7c3aed" />
            <circle cx="50" cy="80" r="2" fill="#7c3aed" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Tecnología de
              <span className="text-red-600"> Primera</span> a tu
              <span className="text-violet-600"> Alcance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Los mejores smartphones, laptops y electrodomésticos con garantía y
              envío gratis. ¡Descubre nuestras ofertas exclusivas!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-red-600 px-8 py-4 rounded-xl border-2 border-red-600 hover:bg-red-50 transition-all">
                Ver Catálogo
              </button>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-red-600">500+</div>
                <div className="text-gray-600">Productos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-600">2000+</div>
                <div className="text-gray-600">Clientes Felices</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">5★</div>
                <div className="text-gray-600">Calificación</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-violet-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1727093493878-874890b4f9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Hero Product"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
