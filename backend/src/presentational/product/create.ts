import { createProductUsecase } from "../../protocols/useCases/createProduct";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";

type data = {
  name: string | null;
  categoryId: string | null;
  price: number | null;
  files: Express.Multer.File[];
};

export class CreateProduct {
  constructor(private createProductUsecase: createProductUsecase) {}
  async handle(data: data) {
    try {
      const { name, categoryId, price, files } = data;
      if (!name) return badRequest(new InvalidParamError("name"));
      if (!categoryId) return badRequest(new InvalidParamError("categoryId"));
      if (!price) return badRequest(new InvalidParamError("price"));
      if (files.length === 0) return badRequest(new InvalidParamError("Image"));
      const images = files.map((img) => img.filename);

      const product = await this.createProductUsecase.create({
        name: name,
        categoryId: categoryId,
        images: images,
        price: price,
      });
      return success(product);
    } catch (error) {
      return server(error);
    }
  }
}
