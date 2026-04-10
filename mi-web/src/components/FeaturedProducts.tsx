import { motion } from "motion/react";
import { Star, MessageCircle, Heart } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "iPhone",
    price: "$1,299",
    oldPrice: "$1,499",
    rating: 5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1727093493878-874890b4f9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Más Vendido",
    badgeColor: "bg-red-600",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Android",
    price: "$1,199",
    oldPrice: "$1,399",
    rating: 5,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1755625655192-bd311c5c5a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbmRyb2lkJTIwc21hcnRwaG9uZSUyMGZsYWdzaGlwfGVufDF8fHx8MTc3NTMzNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Oferta",
    badgeColor: "bg-violet-600",
  },
  {
    id: 3,
    name: "MacBook Pro 14\" M3",
    category: "Laptop",
    price: "$1,999",
    oldPrice: "$2,299",
    rating: 5,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc1MjI5Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Premium",
    badgeColor: "bg-blue-600",
  },
  {
    id: 4,
    name: "AirPods Pro (2nd Gen)",
    category: "Gadget",
    price: "$249",
    oldPrice: "$299",
    rating: 5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1598371611276-1bc503a270a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3NTIyMDYxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Nuevo",
    badgeColor: "bg-green-600",
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    category: "Gadget",
    price: "$429",
    oldPrice: "$499",
    rating: 5,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1719744755507-a4c856c57cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNofGVufDF8fHx8MTc3NTI0NTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Oferta",
    badgeColor: "bg-red-600",
  },
  {
    id: 6,
    name: "Tech Gadget Collection",
    category: "Accesorios",
    price: "$89",
    oldPrice: "$129",
    rating: 4,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1693279504914-d08266ecbe66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0cyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3NTMzNTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Pack",
    badgeColor: "bg-orange-600",
  },
];

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleWhatsAppClick = (productName: string) => {
    const message = `Hola! Estoy interesado en ${productName}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Productos <span className="text-red-600">Destacados</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Los mejores productos seleccionados con ofertas especiales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {product.badge}
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? "fill-red-600 text-red-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <div className="text-sm text-violet-600 font-semibold mb-2">{product.category}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-red-600">{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">{product.oldPrice}</span>
                </div>

                <button
                  onClick={() => handleWhatsAppClick(product.name)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Consultar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-red-600 px-8 py-4 rounded-xl border-2 border-red-600 hover:bg-red-50 transition-all font-semibold">
            Ver Todos los Productos
          </button>
        </div>
      </div>
    </section>
  );
}
