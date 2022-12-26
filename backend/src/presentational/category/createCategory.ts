import { createCategoryUsecase } from "../../protocols/useCases/createCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";

export class CreateCategory {
  constructor(private createCategoryUsecase: createCategoryUsecase) {}

  async handle({ name }: { name: string }) {
    try {
      if (!name) return httpResponse.badRequest(new InvalidParamError("name"));
      await this.createCategoryUsecase.create(name);
      return httpResponse.success(true);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
