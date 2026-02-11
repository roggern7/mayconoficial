import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  alt: string;
  initialIndex?: number;
}

export const ProductImageModal = ({
  open,
  onOpenChange,
  images,
  alt,
  initialIndex = 0,
}: ProductImageModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && open) {
      emblaApi.scrollTo(initialIndex, true);
    }
  }, [emblaApi, open, initialIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const hasMultiple = images.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] p-2 sm:p-4 bg-background/95 backdrop-blur-md border-border">
        <VisuallyHidden>
          <DialogTitle>{alt}</DialogTitle>
        </VisuallyHidden>

        {/* Main image carousel */}
        <div className="relative aspect-square sm:aspect-[4/3] w-full bg-secondary/50 rounded-md overflow-hidden">
          <div ref={emblaRef} className="overflow-hidden h-full">
            <div className="flex h-full">
              {images.map((img, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full h-full flex items-center justify-center">
                  <img
                    src={img}
                    alt={`${alt} - ${i + 1}`}
                    className="max-w-full max-h-full object-contain"
                    loading={i === 0 ? "eager" : "lazy"}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {hasMultiple && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-smooth"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-smooth"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="flex gap-2 justify-center mt-2 overflow-x-auto py-1 px-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition-smooth ${
                  i === selectedIndex
                    ? "border-primary ring-1 ring-primary/50"
                    : "border-border/50 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
