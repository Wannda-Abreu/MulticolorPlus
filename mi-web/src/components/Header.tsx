import { useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import logoImage from "figma:asset/c80542aaace797f98a7f823f0206e8a641ae35a5.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "#" },
    { label: "iPhones", href: "#iphones" },
    { label: "Android", href: "#android" },
    { label: "Laptops", href: "#laptops" },
    { label: "Electrodomésticos", href: "#electrodomesticos" },
    { label: "Accesorios", href: "#accesorios" },
    { label: "Ofertas", href: "#ofertas" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoImage} alt="Multicolor Plus" className="h-12 md:h-16 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-red-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden text-gray-700 hover:text-red-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200 mt-4">
            <div className="flex flex-col gap-3 pt-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
