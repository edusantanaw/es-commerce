import { ActiveUseCase } from "../../mocks/useCases/activeUser";
import { InvalidParamError } from "../../utils/helper/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";
import { ActiveUser } from "./active";

function makeSut() {
  const activeUseCase = new ActiveUseCase();
  const active = new ActiveUser(activeUseCase);
  return { active, activeUseCase };
}

describe("Active user", () => {
  test("Should return an status 400 and message if an userId is not provided", async () => {
    const { active } = makeSut();
    const response = await active.handle({ userId: "", key: "" });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("userId"))
    );
  });
  test("Should return an status 400 and message if an key is not provided", async () => {
    const { active } = makeSut();
    const response = await active.handle({ userId: "", key: "" });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("userId"))
    );
  });
  test("Should return an status 400 and message if an key is not provided", async () => {
    const { active } = makeSut();
    const response = await active.handle({ userId: "valid_userId", key: "" });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("key"))
    );
  });

  test("Should return an status 400 and message if user not found", async () => {
    const { active } = makeSut();
    const response = await active.handle({
      userId: "invalid_userId",
      key: "valid_key",
    });
    expect(response).toEqual(httpResponse.catch("User not found!"));
  });

  test("Should return an status 400 and message if an invalid key is provided", async () => {
    const { active, activeUseCase } = makeSut();
    activeUseCase.user = validUser;
    const response = await active.handle({
      userId: "valid_userId",
      key: "invalid_key",
    });
    expect(response).toEqual(httpResponse.catch("Key is not valid!"));
  });
  test("Should return an status 200 and true if an valid key and valid user is provided", async () => {
    const { active, activeUseCase } = makeSut();
    activeUseCase.user = validUser;
    activeUseCase.keyIsValid = true;
    const response = await active.handle({
      userId: "valid_userId",
      key: "valid_key",
    });
    expect(response).toEqual(httpResponse.success(true));
  });
});
