import { product } from "../../domain/entities/product";
import { validProduct } from "../../presentational/product/createProduct.test";

export class CreateProductUsecaseSpy {
  categoryExists = false;
  product: product = validProduct;
  async create(data: {
    name: string;
    categoryId: string;
    price: number;
    images: string[];
  }) {
    this.categoryExists;
    if (!this.categoryExists) throw "Category not exists!";
    return this.product;
  }
}
