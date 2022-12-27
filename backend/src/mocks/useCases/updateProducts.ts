import { data } from "../../protocols/useCases/updateProductUsecase";

export class UpdateProductUsecaseSpy {
  productExists = false;
  async update(data: data) {
    if (!this.productExists) throw "Product not found!";
    return true;
  }
}
