import { categoryRepository } from "../../../protocols/repository/categoryRepo";
import {
  data,
  productRepository,
} from "../../../protocols/repository/productRepoitory";

export class CreteProductUsecase {
  constructor(
    private categoryRepository: categoryRepository,
    private productRepository: productRepository
  ) {}
  async create(data: data) {
    console.log(data);
    const verifyCategoryExists = await this.categoryRepository.loadById(
      data.categoryId
    );
    if (!verifyCategoryExists) throw "Category not exists!";
    const product = await this.productRepository.create(data);
    return product;
  }
}
