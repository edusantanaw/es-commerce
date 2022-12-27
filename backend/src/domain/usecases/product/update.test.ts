import { ProductRepositorySpy } from "../../../mocks/repositories/productRepository";
import { productRepository } from "../../../protocols/repository/productRepoitory";
import { data } from "../../../protocols/useCases/updateProductUsecase";

class UpadteProductUsecase {
  constructor(private productRepository: productRepository) {}

  async update(data: data) {
    const product = await this.productRepository.loadById(data.id);
    if (!product) throw "Product not found!";
    await this.productRepository.update(data);
    return true;
  }
}

function makeSut() {
  const productRepoitory = new ProductRepositorySpy();
  const updateProductUsecase = new UpadteProductUsecase(productRepoitory);
  return { productRepoitory, updateProductUsecase };
}

const validData = {
  id: "any_id",
  categoryId: "any_price",
  name: "any_name",
  price: 29.99,
};

describe("Update product use case", () => {
  test("Should  throw if product not found", async () => {
    const { updateProductUsecase, productRepoitory } = makeSut();
    productRepoitory.product = null;
    const response = updateProductUsecase.update(validData);
    expect(response).rejects.toBe("Product not found!");
  });
  test("Should return true if product is updated", async () => {
    const { updateProductUsecase } = makeSut();
    const response = await updateProductUsecase.update(validData);
    expect(response).toBe(true);
  });
});
