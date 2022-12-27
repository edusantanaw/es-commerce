import { product } from "../../domain/entities/product";
import { validProduct } from "../../presentational/product/createProduct.test";
import { data } from "../../protocols/repository/productRepoitory";

export class ProductRepositorySpy {
  product = validProduct;
  products: product[] | null = null;
  async create(data: data) {
    return this.product;
  }
  async loadAll() {
    return this.products;
  }
}
