import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5589994703378?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20chuteiras.";

export const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-smooth animate-pulse-gold"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-[#fff]" />
    </a>
  );
};
