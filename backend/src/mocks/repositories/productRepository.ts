import { validProduct } from "../../presentational/product/createProduct.test";
import { data } from "../../protocols/repository/productRepoitory";

export class ProductRepositorySpy {
  product = validProduct;
  async create(data: data) {
    return this.product;
  }
}
