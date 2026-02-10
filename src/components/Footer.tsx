import { MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5589994465218?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20chuteiras.";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
          PRONTO PARA O
          <span className="block text-gold-gradient">PRÓXIMO NÍVEL?</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Entre em contato agora e encontre a chuteira perfeita para o seu jogo.
        </p>

        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="gap-2 font-display tracking-wider text-base px-8 py-6">
            <MessageCircle className="w-5 h-5" />
            FALAR NO WHATSAPP
          </Button>
        </a>

        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <div className="mb-4 md:mb-0">
              <p className="font-display text-2xl font-bold text-gold-gradient">MAYCON IMPORTS</p>
              <p className="text-sm">Chuteiras de elite</p>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>© 2025 Maycon Imports. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
