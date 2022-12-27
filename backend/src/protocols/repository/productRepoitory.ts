import { product } from "../../domain/entities/product";
import { data as updateData } from "../../protocols/useCases/updateProductUsecase";

export type data = {
  name: string;
  categoryId: string;
  price: number;
  images: string[];
};

export interface productRepository {
  create: (data: data) => Promise<product>;
  loadAll: () => Promise<product[] | null>;
  loadByCategory: (categoryId: string) => Promise<product[] | null>;
  loadById: (id: string) => Promise<product | null>;
  loadByName: (name: string) => Promise<product[] | null>;
  update: (data: updateData) => Promise<void>;
}
