import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo-maycon-imports.jfif";

const WHATSAPP_URL = "https://wa.me/5589994465218?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20chuteiras.";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="Maycon Imports" className="h-10 w-auto object-contain" />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className={`font-display text-sm tracking-wider transition-smooth hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            INÍCIO
          </button>
          <button
            onClick={() => navigate("/catalogo")}
            className={`font-display text-sm tracking-wider transition-smooth hover:text-primary ${
              location.pathname === "/catalogo" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            CATÁLOGO
          </button>
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default" size="sm" className="gap-2 font-display tracking-wider">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WHATSAPP</span>
          </Button>
        </a>
      </div>
    </header>
  );
};
