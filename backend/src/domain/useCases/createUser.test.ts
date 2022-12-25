import { EncrypterSpy } from "../../mocks/helpers/encrypterSpy";
import { GenerateTokenSpy } from "../../mocks/helpers/generateTokenSpy";
import { UserRepositorySpy } from "../../mocks/repositories/userRepositorySpy";
import { EmailAlreadyBeingUsed } from "../../utils/helper/errors/emailAlreadyBeingUsed";
import httpResponse from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";
import { CreateUserUseCase } from "./createUserUseCase";

function makeSut() {
  const encrypter = new EncrypterSpy();
  const userRepository = new UserRepositorySpy();
  const generateToken = new GenerateTokenSpy();
  const createUserUseCase = new CreateUserUseCase(
    encrypter,
    userRepository,
    generateToken
  );
  return { createUserUseCase, encrypter, userRepository, generateToken };
}

describe("Create user use case", () => {
  test("Should return an error if email provided is already being used", async () => {
    const { encrypter, generateToken, userRepository } = makeSut();
    userRepository.user = validUser;
    const createUserUseCase = new CreateUserUseCase(
      encrypter,
      userRepository,
      generateToken
    );
    const response = createUserUseCase.create(validUser);
    expect(response).rejects.toEqual(new EmailAlreadyBeingUsed().message);
  });
  test("Should return an user and accessToken", async () => {
    const { encrypter, generateToken, userRepository } = makeSut();
    const createUserUseCase = new CreateUserUseCase(
      encrypter,
      userRepository,
      generateToken
    );
    const response = await createUserUseCase.create(validUser);
    expect(response).toEqual({ accessToken: "token", user: validUser });
  });
});
