import { EncrypterSpy } from "../../../mocks/helpers/encrypterSpy";
import { GenerateTokenSpy } from "../../../mocks/helpers/generateTokenSpy";
import { UserRepositorySpy } from "../../../mocks/repositories/userRepositorySpy";
import { validUser } from "../../../utils/helper/validUser";
import { AuthUseCase } from "./authUsecase";

function makeSut() {
  const userRepositorySpy = new UserRepositorySpy();
  const generateToken = new GenerateTokenSpy();
  const encrypter = new EncrypterSpy();
  const authUseCase = new AuthUseCase(
    userRepositorySpy,
    encrypter,
    generateToken
  );

  return { userRepositorySpy, generateToken, encrypter, authUseCase };
}

describe("Auth use case", () => {
  test("Should thow if user not found", async () => {
    const { authUseCase } = makeSut();
    const response = authUseCase.auth("not_exist@email.com", "password");
    expect(response).rejects.toEqual("User not found!");
  });

  test("Should thow if an password invalid is provided", async () => {
    const { authUseCase, userRepositorySpy, encrypter } = makeSut();
    userRepositorySpy.user = validUser;
    encrypter.isEqual = false;
    const response = authUseCase.auth("not_exist@email.com", "password");
    expect(response).rejects.toEqual("Password is invalid!");
  });
  test("Should thow if an password invalid is provided", async () => {
    const { authUseCase, userRepositorySpy, encrypter } = makeSut();
    userRepositorySpy.user = validUser;
    encrypter.isEqual = true;
    const response = await authUseCase.auth("not_exist@email.com", "password");
    expect(response).toEqual({ accessToken: "token", user: validUser });
  });
});
