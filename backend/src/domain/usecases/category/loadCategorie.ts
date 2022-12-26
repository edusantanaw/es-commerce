import { categoryRepository } from "../../../protocols/repository/categoryRepo";

export class LoadCategoryUseCase {
  constructor(private categoryRepository: categoryRepository) {}

  async loadAll() {
    const categories = await this.categoryRepository.loadAll();
    return categories;
  }

  async loadById(id: string) {
    const categories = await this.categoryRepository.loadById(id);
    return categories;
  }

  async loadByName(name: string) {
    const categories = await this.categoryRepository.loadByName(name);
    return categories;
  }
}
