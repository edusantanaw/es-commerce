import { product } from "../../domain/entities/product";

export interface loadProductUsecase {
  loadAll: () => Promise<product[] | null>;
}
