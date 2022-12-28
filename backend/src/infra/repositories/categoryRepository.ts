import { category } from "../../prisma/prisma";
import { categoryRepository } from "../../protocols/repository/categoryRepo";

export class CategoryRepository implements categoryRepository {
  async create(name: string) {
    await category.create({
      data: {
        name: name,
      },
    });
    return;
  }
  async loadByName(name: string) {
    const categoryResponse = await category.findMany({
      where: {
        name: name,
      },
    });
    if (categoryResponse.length > 0) return categoryResponse;
    return null;
  }

  async loadById(id: string) {
    const categoryResponse = await category.findFirst({
      where: {
        id: id,
      },
    });
    return categoryResponse;
  }

  async loadAll() {
    const categories = await category.findMany();
    return categories;
  }
}
