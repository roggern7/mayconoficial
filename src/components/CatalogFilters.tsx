import type { Categoria } from "@/types/product";

interface CatalogFiltersProps {
  selectedCategory: Categoria | null;
  onCategorySelect: (cat: Categoria | null) => void;
  selectedSize: number | null;
  onSizeSelect: (size: number | null) => void;
  availableSizes: number[];
}

const CATEGORIES: { label: string; value: Categoria | null }[] = [
  { label: "TODOS", value: null },
  { label: "CAMPO", value: "CAMPO" },
  { label: "FUTSAL", value: "FUTSAL" },
  { label: "SOCIETY", value: "SOCIETY" },
];

export const CatalogFilters = ({
  selectedCategory,
  onCategorySelect,
  selectedSize,
  onSizeSelect,
  availableSizes,
}: CatalogFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Category filter */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-display tracking-wider">CATEGORIA</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onCategorySelect(cat.value)}
              className={`px-4 py-2 rounded-md text-sm font-display tracking-wider transition-smooth border ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size filter */}
      {availableSizes.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-display tracking-wider">TAMANHO</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onSizeSelect(null)}
              className={`px-3 py-1.5 rounded-md text-xs font-display tracking-wider transition-smooth border ${
                selectedSize === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
              }`}
            >
              TODOS
            </button>
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
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
      )}
    </div>
  );
};
