import { product } from "../../domain/entities/product";
import { validProduct } from "../../presentational/product/createProduct.test";
import { data } from "../../protocols/repository/productRepoitory";
import { data as updateData } from "../../protocols/useCases/updateProductUsecase";

export class ProductRepositorySpy {
  product: product | null = validProduct;
  products: product[] | null = null;
  async create(data: data) {
    if (this.product) return this.product;
    return validProduct;
  }
  async loadAll() {
    return this.products;
  }
  async loadByCategory(categoryId: string) {
    return this.products;
  }
  async loadById(id: string) {
    return this.product;
  }
  async loadByName(name: string) {
    return this.products;
  }

  async update(data: updateData) {
    return;
  }
}
