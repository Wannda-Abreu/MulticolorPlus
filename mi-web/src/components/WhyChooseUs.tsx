import { motion } from "motion/react";
import { Shield, Truck, HeadphonesIcon, CreditCard, Award, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garantía Oficial",
    description: "Todos nuestros productos cuentan con garantía del fabricante",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Entrega sin costo en compras mayores a $100",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7",
    description: "Atención personalizada por WhatsApp todo el día",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: CreditCard,
    title: "Pagos Seguros",
    description: "Múltiples métodos de pago y planes de financiación",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    title: "Productos Certificados",
    description: "100% originales y verificados",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: RefreshCw,
    title: "Devoluciones Fáciles",
    description: "30 días para cambios y devoluciones sin problemas",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por Qué Elegir <span className="text-red-600">Multicolor Plus</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia de compra con servicios premium
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
