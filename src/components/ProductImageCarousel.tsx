import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  onImageClick?: () => void;
  variant?: "card" | "modal";
}

export const ProductImageCarousel = ({
  images,
  alt,
  onImageClick,
  variant = "card",
}: ProductImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const hasMultiple = images.length > 1;
  const objectFit = variant === "modal" ? "object-contain" : "object-cover";

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollNext();
    },
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-secondary flex items-center justify-center">
        <img src="/placeholder.svg" alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div
        className={`${variant === "card" ? "aspect-square" : "w-full h-full"} overflow-hidden bg-secondary cursor-pointer`}
        onClick={onImageClick}
      >
        <img
          src={images[0]}
          alt={alt}
          className={`w-full h-full ${objectFit} transition-smooth group-hover:scale-105`}
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${variant === "card" ? "aspect-square" : "w-full h-full"} bg-secondary`}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div ref={emblaRef} className="overflow-hidden h-full cursor-pointer" onClick={onImageClick}>
        <div className="flex h-full">
          {images.map((img, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full h-full">
              <img
                src={img}
                alt={`${alt} - ${i + 1}`}
                className={`w-full h-full ${objectFit} transition-smooth`}
                loading={i === 0 ? "eager" : "lazy"}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={scrollPrev}
            className={`absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-smooth ${
              showArrows || variant === "modal" ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-smooth ${
              showArrows || variant === "modal" ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                scrollTo(i);
              }}
              className={`w-2 h-2 rounded-full transition-smooth ${
                i === selectedIndex
                  ? "bg-primary w-4"
                  : "bg-foreground/40 hover:bg-foreground/60"
              }`}
              aria-label={`Imagem ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { type ProductImageCarouselProps };
