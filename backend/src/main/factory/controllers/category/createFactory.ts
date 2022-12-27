import { CreateCategory } from "../../../../presentational/category/createCategory";
import { makeCreateCategoryUsecase } from "../../usecases/createCategory";

export function makeCreateCategory() {
  const createCategoryUsecase = makeCreateCategoryUsecase();
  return new CreateCategory(createCategoryUsecase);
}
