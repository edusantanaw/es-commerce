import { category } from "../../domain/entities/category";
import { categoryRepository } from "../../protocols/repository/categoryRepo";

export class CategoryRepositorySpy implements categoryRepository {
  category: category | null = null;
  categories: category[] | null = null;
  async loadByName(name: string) {
    return this.categories;
  }

  async create(name: string) {
    if (this.category) throw "Category already exists!";
    return;
  }

  async loadById(id: string) {
    return this.category;
  }

  async loadAll() {
    return this.categories;
  }
}
