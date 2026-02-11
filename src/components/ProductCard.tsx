import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";
import { ProductImageModal } from "@/components/ProductImageModal";
import type { Produto } from "@/types/product";

interface ProductCardProps {
  produto: Produto;
}

export const ProductCard = ({ produto }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const images = useMemo(() => {
    return [produto.imagem, ...(produto.imagensExtras || [])].filter(Boolean);
  }, [produto.imagem, produto.imagensExtras]);

  const handleBuy = () => {
    if (!selectedSize) return;
    const preco = produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const message = `Olá! Tenho interesse na chuteira ${produto.nome} (${produto.categoria}). Preço: ${preco}. Tamanho: ${selectedSize}. Pode me informar disponibilidade e prazo de envio?`;
    window.open(
      `https://wa.me/5589994465218?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden border border-border card-glow card-glow-hover transition-smooth group">
        <div className="aspect-square overflow-hidden bg-secondary">
          <ProductImageCarousel
            images={images}
            alt={produto.nome}
            onImageClick={() => setModalOpen(true)}
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              {produto.nome}
            </h3>
            <span className="text-xs font-display tracking-wider bg-primary/15 text-primary px-2 py-1 rounded-sm whitespace-nowrap">
              {produto.categoria}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{produto.descricao}</p>

          <p className="font-display text-2xl font-bold text-primary">
            {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>

          {/* Tamanhos */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-display tracking-wider">TAMANHOS</p>
            <div className="flex flex-wrap gap-1.5">
              {produto.tamanhosDisponiveis.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`w-9 h-9 rounded-md text-xs font-semibold transition-smooth border ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleBuy}
            disabled={!selectedSize}
            className={`w-full gap-2 font-display tracking-wider ${!selectedSize ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <MessageCircle className="w-4 h-4" />
            {selectedSize ? "COMPRAR NO WHATSAPP" : "SELECIONE O TAMANHO"}
          </Button>
        </div>
      </div>

      <ProductImageModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        images={images}
        alt={produto.nome}
      />
    </>
  );
};
