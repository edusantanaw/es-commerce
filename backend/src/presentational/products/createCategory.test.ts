import { CreateCategoryUseCaseSpy } from "../../mocks/useCases/createCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";
import { CreateCategory } from "./createCategory";

function makeSut() {
  const createCategoryUseCase = new CreateCategoryUseCaseSpy();
  const createCategory = new CreateCategory(createCategoryUseCase);
  return { createCategory, createCategoryUseCase };
}

describe("Create Category", () => {
  test("Should return an error if name is not provided", async () => {
    const { createCategory } = makeSut();
    const response = await createCategory.handle({ name: "" });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("name"))
    );
  });
  test("Should return an error if category already exists", async () => {
    const { createCategory, createCategoryUseCase } = makeSut();
    createCategoryUseCase.categoryExists = true;
    const response = await createCategory.handle({ name: "already_usedName" });
    expect(response).toEqual(httpResponse.catch("Category already exists!"));
  });
  test("Should return status 200 and true if category is created", async () => {
    const { createCategory } = makeSut();
    const response = await createCategory.handle({ name: "already_usedName" });
    expect(response).toEqual(httpResponse.success(true));
  });
});
