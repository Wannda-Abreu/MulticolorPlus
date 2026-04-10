import { Phone, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-red-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">🎉 Ofertas especiales hasta 50% OFF</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span>+0005 0509 00</span>
            </a>
            <a href="mailto:info@multicolorplus.com" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@multicolorplus.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
