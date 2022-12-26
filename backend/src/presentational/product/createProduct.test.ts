import { product } from "../../domain/entities/product";
import { CreateProductUsecaseSpy } from "../../mocks/useCases/createProduct";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";
import { CreateProduct } from "./create";

export const validProduct: product = {
  id: "any_id",
  name: "any_name",
  price: 30.0,
  image: ["123.img", "123.img"],
  categoryId: "any_categoryId",
};

const validImage: any = {
  buffer: 21,
  destination: "",
  fieldname: "",
  filename: "",
  mimetype: "",
  originalname: "",
  path: "",
  size: 21,
  stream: "1",
  encoding: "1221",
};

function makeSut() {
  const createProductUsecase = new CreateProductUsecaseSpy();
  const createProduct = new CreateProduct(createProductUsecase);
  return { createProduct, createProductUsecase };
}

describe("Create product", () => {
  test("Should return status 400 if no name is provided", async () => {
    const { createProduct } = makeSut();
    const response = await createProduct.handle({
      name: null,
      categoryId: null,
      files: [],
      price: null,
    });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("name"))
    );
  });
  test("Should return status 400 if no categoryUd is provided", async () => {
    const { createProduct } = makeSut();
    const response = await createProduct.handle({
      name: "any_name",
      categoryId: null,
      files: [],
      price: null,
    });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("categoryId"))
    );
  });
  test("Should return status 400 if no price is provided", async () => {
    const { createProduct } = makeSut();
    const response = await createProduct.handle({
      name: "any_name",
      categoryId: "any_category",
      files: [],
      price: null,
    });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("price"))
    );
  });
  test("Should return status 400 if no Image is provided", async () => {
    const { createProduct } = makeSut();
    const response = await createProduct.handle({
      name: "any_name",
      categoryId: "any_category",
      files: [],
      price: 22.22,
    });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("Image"))
    );
  });
  test("Should throw if category is invalid", async () => {
    const { createProduct } = makeSut();
    const response = await createProduct.handle({
      name: "any_name",
      categoryId: "any_category",
      files: [validImage],
      price: 22.22,
    });
    expect(response).toEqual(httpResponse.catch("Category not exists!"));
  });

  test("Should return status 200 and an product", async () => {
    const { createProduct, createProductUsecase } = makeSut();
    createProductUsecase.product = {
      name: "any_name",
      price: 29.99,
      categoryId: "any_id",
      id: "any_id",
      image: ["any_image"],
    };
    createProductUsecase.categoryExists = true;
    const response = await createProduct.handle({
      name: "any_name",
      categoryId: "any_category",
      files: [validImage],
      price: 22.22,
    });
    expect(response).toEqual(
      httpResponse.success({
        name: "any_name",
        price: 29.99,
        categoryId: "any_id",
        id: "any_id",
        image: ["any_image"],
      })
    );
  });
});
