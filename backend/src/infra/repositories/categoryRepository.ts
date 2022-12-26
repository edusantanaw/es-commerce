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
    const categoryResponse = await category.findFirst({
      where: {
        name: name,
      },
    });
    return categoryResponse;
  }

  async loadById(id: string) {
    const categoryResponse = await category.findFirst({
      where: {
        id: id,
      },
    });
    return categoryResponse;
  }
}
