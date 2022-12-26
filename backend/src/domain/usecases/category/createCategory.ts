import { categoryRepository } from "../../../protocols/repository/categoryRepo";

export class CreateCategoryUsecase {
  constructor(private categoryRepository: categoryRepository) {}
  async create(name: string) {
    const verifyCategoryExists = await this.categoryRepository.loadByName(name);
    if (verifyCategoryExists) throw "Category already exists!";
    await this.categoryRepository.create(name);
    return true;
  }
}
