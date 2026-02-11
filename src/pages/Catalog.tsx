import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CatalogFilters } from "@/components/CatalogFilters";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Categoria } from "@/types/product";

const Catalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: produtos = [], isLoading, isError } = useProducts({
    categoria: selectedCategory,
    q: searchQuery || undefined,
  });

  const filtered = useMemo(() => {
    if (!selectedSize) return produtos;
    return produtos.filter((p) => p.tamanhosDisponiveis.includes(selectedSize));
  }, [produtos, selectedSize]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<number>();
    produtos.forEach((p) => p.tamanhosDisponiveis.forEach((s) => sizes.add(s)));
    return Array.from(sizes).sort((a, b) => a - b);
  }, [produtos]);

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

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou descrição..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="mb-8">
          <CatalogFilters
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            availableSizes={availableSizes}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-display text-lg">
              {produtos.length > 0
                ? "Nenhum produto encontrado com esses filtros."
                : "Nenhum produto disponível no momento."}
            </p>
          </div>
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
