import { LoadCategoryUseCase } from "../../../domain/usecases/category/loadCategorie";
import { CategoryRepository } from "../../../infra/repositories/categoryRepository";

export function makeLoadCategoryUsecase() {
  const categoryRepository = new CategoryRepository();
  return new LoadCategoryUseCase(categoryRepository);
}
