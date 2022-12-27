import { UpdateProductUsecaseSpy } from "../../mocks/useCases/updateProducts";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";
import { UpdateProduct } from "./updateProduct";

function makeSut() {
  const updateProductUsecase = new UpdateProductUsecaseSpy();
  const updateProduct = new UpdateProduct(updateProductUsecase);
  return { updateProduct, updateProductUsecase };
}

describe("Update product", () => {
  test("Should return status 400 and an invalid param message if id is not proovided", async () => {
    const { updateProduct } = makeSut();
    const response = await updateProduct.handle({
      id: "",
      categoryId: "",
      name: "",
      price: null,
    });
    expect(response).toEqual(badRequest(new InvalidParamError("id")));
  });
  test("Should return status 400 and an invalid param message if name is not proovided", async () => {
    const { updateProduct } = makeSut();
    const response = await updateProduct.handle({
      id: "any_id",
      categoryId: "",
      name: "",
      price: null,
    });
    expect(response).toEqual(badRequest(new InvalidParamError("name")));
  });
  test("Should return status 400 and an invalid param message if category is not proovided", async () => {
    const { updateProduct } = makeSut();
    const response = await updateProduct.handle({
      id: "any_id",
      categoryId: "",
      name: "any_name",
      price: null,
    });
    expect(response).toEqual(badRequest(new InvalidParamError("categoryId")));
  });
  test("Should return status 400 and an invalid param message if price is not proovided", async () => {
    const { updateProduct } = makeSut();
    const response = await updateProduct.handle({
      id: "any_id",
      categoryId: "any_price",
      name: "any_name",
      price: null,
    });
    expect(response).toEqual(badRequest(new InvalidParamError("price")));
  });
  test("Should thow if product not found", async () => {
    const { updateProduct } = makeSut();
    const response = await updateProduct.handle({
      id: "any_id",
      categoryId: "any_price",
      name: "any_name",
      price: 29.99,
    });
    expect(response).toEqual(server("Product not found!"));
  });
  test("Should return 200 and true if product is updated", async () => {
    const { updateProduct, updateProductUsecase } = makeSut();
    updateProductUsecase.productExists = true;
    const response = await updateProduct.handle({
      id: "any_id",
      categoryId: "any_price",
      name: "any_name",
      price: 29.99,
    });
    expect(response).toEqual(success(true));
  });
});
