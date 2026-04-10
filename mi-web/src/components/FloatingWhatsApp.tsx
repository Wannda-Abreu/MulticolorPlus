import { motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onClick={isOpen ? () => setIsOpen(false) : handleWhatsAppClick}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageCircle className="w-8 h-8" />
        )}
        
        {/* Ping Animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
      </motion.button>

      {/* Tooltip */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-4 max-w-xs"
        >
          <div className="flex items-start gap-3">
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">¿Necesitas ayuda?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Chatea con nosotros en WhatsApp para consultas inmediatas
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
              >
                Iniciar Chat
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
