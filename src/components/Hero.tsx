import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_URL = "https://wa.me/5589994465218?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20chuteiras.";

export const Hero = () => {
  const navigate = useNavigate();

  const handleScrollDown = () => {
    const section = document.getElementById("produtos");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-16">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider mb-4">
          <span className="block text-foreground">MAYCON</span>
          <span className="block text-gold-gradient">IMPORTS</span>
        </h1>

        <p className="font-display text-lg sm:text-xl tracking-[0.3em] text-muted-foreground mb-10 uppercase">
          Chuteiras de elite para quem joga sério
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/catalogo")}
            className="font-display tracking-wider text-base px-8 py-6"
          >
            VER CATÁLOGO
          </Button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="font-display tracking-wider text-base px-8 py-6 gap-2 border-primary/50 text-primary hover:bg-primary/10"
            >
              <MessageCircle className="w-5 h-5" />
              FALE CONOSCO
            </Button>
          </a>
        </div>

        <div className="mt-14 text-muted-foreground text-sm tracking-[0.25em] font-display">
          PERFORMANCE • QUALIDADE • ESTILO
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-smooth animate-bounce"
        aria-label="Ver produtos"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};
