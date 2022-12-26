import { CategoryRepositorySpy } from "../../../mocks/repositories/categoryRepository";
import { CreateCategoryUsecase } from "./createCategory";

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
    const { createCategoryUseCase, categoryRepository } = makeSut();
    categoryRepository.category = null;
    const response = await createCategoryUseCase.create("any_name");
    expect(response).toBe(true);
  });
});
