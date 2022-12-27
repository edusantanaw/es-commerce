import { CreateCategoryUsecase } from "../../../domain/usecases/category/createCategory";
import { CategoryRepository } from "../../../infra/repositories/categoryRepository";

export function makeCreateCategoryUsecase() {
  const categoryRepository = new CategoryRepository();
  return new CreateCategoryUsecase(categoryRepository);
}
