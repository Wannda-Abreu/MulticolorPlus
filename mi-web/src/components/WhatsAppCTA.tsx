import { motion } from "motion/react";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";

export function WhatsAppCTA() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-violet-700"></div>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="whatsapp-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="white" />
            <line x1="50" y1="50" x2="80" y2="50" stroke="white" strokeWidth="1" />
            <line x1="50" y1="50" x2="50" y2="80" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#whatsapp-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              ¿Tienes Dudas? ¡Contáctanos por WhatsApp!
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte a encontrar el producto perfecto.
              Respuesta inmediata garantizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all shadow-2xl flex items-center gap-3 text-lg font-bold group"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Chatear Ahora</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-2xl border-2 border-white hover:bg-white/30 transition-all flex items-center gap-3 text-lg font-bold"
              >
                <Phone className="w-6 h-6" />
                <span>+0005 0509 00</span>
              </motion.a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-white">
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/80">Atención</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div>
                <div className="text-3xl font-bold">&lt;5min</div>
                <div className="text-white/80">Respuesta</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-white/80">Satisfacción</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
