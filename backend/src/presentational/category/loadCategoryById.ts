import { loadCategoryUseCase } from "../../protocols/useCases/loadCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";

export class LoadCategoryById {
  constructor(private loadCategoryUsecase: loadCategoryUseCase) {}

  async handle({ id }: { id: string }) {
    try {
      if (!id) return httpResponse.badRequest(new InvalidParamError("id"));
      const category = await this.loadCategoryUsecase.loadById(id);
      if (!category) return httpResponse.notContent("Category");
      return httpResponse.success(category);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
