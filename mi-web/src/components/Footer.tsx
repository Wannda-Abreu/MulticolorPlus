import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logoImage from "figma:asset/c80542aaace797f98a7f823f0206e8a641ae35a5.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src={logoImage} alt="Multicolor Plus" className="h-12 mb-4" />
            <p className="text-gray-400 mb-4">
              Tu tienda de confianza para tecnología y electrodomésticos. Los mejores
              productos a los mejores precios.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  iPhones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Electrodomésticos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Av. Principal 123, Ciudad, País
                </span>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>+0005 0509 00</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@multicolorplus.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Mail className="w-5 h-5 text-red-600" />
                  <span>info@multicolorplus.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Multicolor Plus. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                Política de Devoluciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
