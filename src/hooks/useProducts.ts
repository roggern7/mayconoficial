import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";
import type { Produto, Categoria } from "@/types/product";

interface UseProductsOptions {
  categoria?: Categoria | null;
  q?: string;
}

const fetchProducts = async (options: UseProductsOptions): Promise<Produto[]> => {
  const params = new URLSearchParams();
  if (options.categoria) params.set("categoria", options.categoria);
  if (options.q) params.set("q", options.q);

  const qs = params.toString();
  const url = `${API_BASE_URL}/api/products${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao carregar produtos");
  return res.json();
};

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery<Produto[]>({
    queryKey: ["products", options.categoria ?? "ALL", options.q ?? ""],
    queryFn: () => fetchProducts(options),
    staleTime: 1000 * 60 * 5,
  });
};
