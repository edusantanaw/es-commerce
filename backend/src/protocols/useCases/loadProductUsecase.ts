import { product } from "../../domain/entities/product";

export interface loadProductUsecase {
  loadAll: () => Promise<product[] | null>;
  loadByCategory: (categoryId: string) => Promise<product[] | null>;
  loadById: (id: string) => Promise<product | null>;
  loadByName: (name: string) => Promise<product[] | null>;
}
