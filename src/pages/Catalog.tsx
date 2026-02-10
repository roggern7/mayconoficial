import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CatalogFilters } from "@/components/CatalogFilters";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { produtos } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Categoria } from "@/types/product";

const Catalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return produtos.filter((p) => {
      if (selectedCategory && p.categoria !== selectedCategory) return false;
      if (selectedSize && !p.tamanhosDisponiveis.includes(selectedSize)) return false;
      return true;
    });
  }, [selectedCategory, selectedSize]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<number>();
    produtos.forEach((p) => p.tamanhosDisponiveis.forEach((s) => sizes.add(s)));
    return Array.from(sizes).sort((a, b) => a - b);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </div>

        <header className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Catálogo de <span className="text-gold-gradient">Chuteiras</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre a chuteira ideal para o seu estilo de jogo
          </p>
        </header>

        <div className="mb-8">
          <CatalogFilters
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            availableSizes={availableSizes}
          />
        </div>

        {!filtered.length && produtos.length > 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-display text-lg">
              Nenhum produto encontrado com esses filtros.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <p className="text-muted-foreground text-center mb-6">
              {filtered.length} produto(s) encontrado(s)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((produto, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <ProductCard produto={produto} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Catalog;
