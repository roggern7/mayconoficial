import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import { Loader2 } from "lucide-react";

export const ProductsPreview = () => {
  const navigate = useNavigate();
  const { data: produtos = [], isLoading } = useProducts();
  const destaques = produtos.slice(0, 4);

  return (
    <section id="produtos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            NOSSOS <span className="text-gold-gradient">DESTAQUES</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chuteiras selecionadas para elevar seu jogo
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : destaques.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {destaques.map((produto, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProductCard produto={produto} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate("/catalogo")}
                className="font-display tracking-wider text-base px-10 py-6"
              >
                VER CATÁLOGO COMPLETO
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
