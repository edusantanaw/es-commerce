import { loadCategoryUseCase } from "../../protocols/useCases/loadCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  server,
  success,
} from "../../utils/helper/httpResponse";

export class LoadCategoryByName {
  constructor(private loadCategoryUsecase: loadCategoryUseCase) {}

  async handle({ name }: { name: string }) {
    try {
      if (!name) return badRequest(new InvalidParamError("name"));
      const category = await this.loadCategoryUsecase.loadByName(name);
      if (!category) return notContent("Category");
      return success(category);
    } catch (error) {
      return server(error);
    }
  }
}
