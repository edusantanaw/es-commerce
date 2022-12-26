import { category } from "../../domain/entities/category";

export class LoadCategoryUseCase {
  categories: category[] | null = null;
  category: category | null = null;
  async loadAll() {
    if (!this.categories) return null;
    return this.categories;
  }
  async loadByName(name: string) {
    if (!this.categories) return null;
    return this.categories;
  }
  async loadById(id: string) {
    if (!this.category) return null;
    return this.category;
  }
}
