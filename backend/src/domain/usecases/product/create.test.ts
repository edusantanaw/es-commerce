import { CategoryRepositorySpy } from "../../../mocks/repositories/categoryRepository";
import { ProductRepositorySpy } from "../../../mocks/repositories/productRepository";
import { validProduct } from "../../../presentational/product/createProduct.test";
import { CreteProductUsecase } from "./create";

function makeSut() {
  const categoryRepository = new CategoryRepositorySpy();
  const productRepository = new ProductRepositorySpy();
  const createProductUsecase = new CreteProductUsecase(
    categoryRepository,
    productRepository
  );
  return { categoryRepository, createProductUsecase };
}

describe("Create product use case", () => {
  test("Shoul throw if category not exists", async () => {
    const { createProductUsecase } = makeSut();
    const response = createProductUsecase.create({
      categoryId: "not_exists",
      name: "any_name",
      images: ["any_img"],
      price: 29.99,
    });
    expect(response).rejects.toBe("Category not exists!");
  });
  test("Shoul return an user if created with success", async () => {
    const { createProductUsecase, categoryRepository } = makeSut();
    categoryRepository.category = validProduct;
    const response = await createProductUsecase.create({
      categoryId: "not_exists",
      name: "any_name",
      images: ["any_img"],
      price: 29.99,
    });
    expect(response).toEqual(validProduct);
  });
});
