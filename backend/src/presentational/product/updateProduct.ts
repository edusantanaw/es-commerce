import {
  data,
  updateProductUsecase,
} from "../../protocols/useCases/updateProductUsecase";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";

export class UpdateProduct {
  constructor(private updateProductUsecase: updateProductUsecase) {}
  async handle(data: data) {
    try {
      const { id, name, categoryId, price } = data;
      if (!id) return badRequest(new InvalidParamError("id"));
      if (!name) return badRequest(new InvalidParamError("name"));
      if (!categoryId) return badRequest(new InvalidParamError("categoryId"));
      if (!price) return badRequest(new InvalidParamError("price"));
      await this.updateProductUsecase.update(data);
      return success(true);
    } catch (error) {
      return server(error);
    }
  }
}
