import { product } from "../../domain/entities/product";

export type data = {
  name: string;
  categoryId: string;
  price: number;
  images: string[];
};

export interface productRepository {
  create: (data: data) => Promise<product>;
  loadAll: () => Promise<product[] | null>;
}
