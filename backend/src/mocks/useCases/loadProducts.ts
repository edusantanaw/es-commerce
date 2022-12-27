import { product } from "../../domain/entities/product";
import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";

export class LoadProductUsecaseSpy implements loadProductUsecase {
  products: product[] | null = null;
  product: product | null = null;
  async loadAll() {
    return this.products;
  }
  async loadById(id: string) {
    return this.product;
  }
  async loadByName(name: string) {
    return this.products;
  }
  async loadByCategory(categoryId: string) {
    return this.products;
  }
}
