import { loadCategoryUseCase } from "../../protocols/useCases/loadCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";

export class LoadCategoryByName {
  constructor(private loadCategoryUsecase: loadCategoryUseCase) {}

  async handle({ name }: { name: string }) {
    try {
      if (!name) return httpResponse.badRequest(new InvalidParamError("name"));
      const category = await this.loadCategoryUsecase.loadByName(name);
      if (!category) return httpResponse.notContent("Category");
      return httpResponse.success(category);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
