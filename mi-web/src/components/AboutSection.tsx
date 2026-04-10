import { motion } from "motion/react";
import { Users, Store, ShoppingBag, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Clientes Satisfechos", value: "2000+", color: "text-red-600" },
  { icon: Store, label: "Años en el Mercado", value: "5+", color: "text-violet-600" },
  { icon: ShoppingBag, label: "Productos Vendidos", value: "10K+", color: "text-blue-600" },
  { icon: TrendingUp, label: "Calificación", value: "5.0", color: "text-green-600" },
];

export function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sobre <span className="text-red-600">Multicolor Plus</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Somos una empresa líder en la venta de tecnología y electrodomésticos,
              comprometidos con ofrecer productos de la más alta calidad a precios
              competitivos. Nuestra misión es hacer que la tecnología esté al alcance
              de todos.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Con años de experiencia en el mercado, nos hemos convertido en la tienda
              de confianza para miles de clientes. Contamos con un equipo de expertos
              que te ayudarán a encontrar el producto perfecto para tus necesidades.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1727093493878-874890b4f9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Store"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1693279504914-d08266ecbe66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0cyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3NTMzNTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Products"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc1MjI5Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Technology"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1719744755507-a4c856c57cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNofGVufDF8fHx8MTc3NTI0NTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Gadgets"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-red-600 to-violet-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
