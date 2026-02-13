export type Categoria = "CAMPO" | "FUTSAL" | "SOCIETY" | "MEIAS" | "CANELEIRAS";

export interface Produto {
  nome: string;
  categoria: Categoria;
  preco: number;
  descricao: string;
  imagem: string;
  imagemThumb?: string;
  imagensExtras?: string[];
  tamanhosDisponiveis: number[];
}
