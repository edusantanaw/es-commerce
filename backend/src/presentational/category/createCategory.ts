import { createCategoryUsecase } from "../../protocols/useCases/createCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";

export class CreateCategory {
  constructor(private createCategoryUsecase: createCategoryUsecase) {}

  async handle({ name }: { name: string }) {
    try {
      if (!name) return badRequest(new InvalidParamError("name"));
      await this.createCategoryUsecase.create(name);
      return success(true);
    } catch (error) {
      return server(error);
    }
  }
}
