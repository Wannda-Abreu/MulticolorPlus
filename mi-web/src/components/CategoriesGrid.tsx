import { motion } from "motion/react";
import { Smartphone, Laptop, Home, Headphones, ShieldCheck } from "lucide-react";

const categories = [
  {
    name: "iPhones",
    icon: Smartphone,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    image: "https://images.unsplash.com/photo-1727093493878-874890b4f9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Android",
    icon: Smartphone,
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50",
    image: "https://images.unsplash.com/photo-1755625655192-bd311c5c5a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbmRyb2lkJTIwc21hcnRwaG9uZSUyMGZsYWdzaGlwfGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Laptops",
    icon: Laptop,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc1MjI5Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Electrodomésticos",
    icon: Home,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-orange-50",
    image: "https://images.unsplash.com/photo-1740803292374-1b167c1558b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMGtpdGNoZW58ZW58MXx8fHwxNzc1MzIzMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Gadgets",
    icon: Headphones,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1693279504914-d08266ecbe66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0cyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3NTMzNTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Accesorios",
    icon: ShieldCheck,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    image: "https://images.unsplash.com/photo-1544228865-7d73678c0f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBzY3JlZW4lMjBwcm90ZWN0b3J8ZW58MXx8fHwxNzc1MzM1MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function CategoriesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explora Nuestras <span className="text-red-600">Categorías</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra todo lo que necesitas en tecnología y electrodomésticos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className={`${category.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-center font-semibold text-gray-900">{category.name}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
