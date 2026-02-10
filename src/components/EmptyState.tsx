import { ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5589994465218?text=Olá!%20Gostaria%20de%20saber%20quais%20chuteiras%20estão%20disponíveis.";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        Catálogo em atualização
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Nossos produtos estão sendo atualizados. Entre em contato via WhatsApp para ver os modelos disponíveis!
      </p>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        <Button className="gap-2 font-display tracking-wider">
          <MessageCircle className="w-4 h-4" />
          FALAR NO WHATSAPP
        </Button>
      </a>
    </div>
  );
};
