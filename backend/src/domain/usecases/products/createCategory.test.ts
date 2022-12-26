import { categoryRepository } from "../../../protocols/repository/categoryRepo";
import { category } from "../../entities/category";

class CreateCategoryUsecase {
  constructor(private categoryRepository: categoryRepository) {}
  async create(name: string) {
    const verifyCategoryExists = await this.categoryRepository.loadByName(name);
    if (verifyCategoryExists) throw "Category already exists!";
    await this.categoryRepository.create(name);
    return true;
  }
}

class CategoryRepositorySpy {
  category: category | null = null;
  async loadByName(name: string) {
    return this.category;
  }

  async create(name: string) {
    return;
  }

  async loadById(id: string) {
    return this.category;
  }
}

function makeSut() {
  const categoryRepository = new CategoryRepositorySpy();
  const createCategoryUseCase = new CreateCategoryUsecase(categoryRepository);
  return { categoryRepository, createCategoryUseCase };
}

describe("Create category use case", () => {
  test("Should thow if category already exists", () => {
    const { categoryRepository, createCategoryUseCase } = makeSut();
    categoryRepository.category = { id: "any_id", name: "any_name" };
    const response = createCategoryUseCase.create("any_name");
    expect(response).rejects.toBe("Category already exists!");
  });
  test("Should return true if category is create", async () => {
    const { createCategoryUseCase } = makeSut();
    const response = await createCategoryUseCase.create("any_name");
    expect(response).toBe(true);
  });
});
