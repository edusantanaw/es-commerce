import { product } from "../../domain/entities/product";

export class LoadProductUsecaseSpy {
  products: product[] | null = null;
  async loadAll() {
    return this.products;
  }
}
