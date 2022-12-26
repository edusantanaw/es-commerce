import { EncrypterSpy } from "../../../mocks/helpers/encrypterSpy";
import { GenerateTokenSpy } from "../../../mocks/helpers/generateTokenSpy";
import { UserRepositorySpy } from "../../../mocks/repositories/userRepositorySpy";
import { EmailAlreadyBeingUsed } from "../../../utils/errors/emailAlreadyBeingUsed";
import { validUser } from "../../../utils/helper/validUser";
import { CreateUserUseCase } from "./createUserUseCase";

function makeSut() {
  const encrypter = new EncrypterSpy();
  const userRepository = new UserRepositorySpy();
  const generateToken = new GenerateTokenSpy();
  const senderEmail = new SenderEmailSpy();
  const createUserUseCase = new CreateUserUseCase(
    encrypter,
    userRepository,
    generateToken,
    senderEmail
  );
  return {
    createUserUseCase,
    encrypter,
    userRepository,
    generateToken,
    senderEmail,
  };
}

class SenderEmailSpy {
  async sender(email: string) {
    return "";
  }
  config() {}
}

describe("Create user use case", () => {
  test("Should return an error if email provided is already being used", async () => {
    const { encrypter, generateToken, userRepository, senderEmail } = makeSut();
    userRepository.user = validUser;
    const createUserUseCase = new CreateUserUseCase(
      encrypter,
      userRepository,
      generateToken,
      senderEmail
    );
    const response = createUserUseCase.create({
      email: validUser.email,
      name: validUser.name,
      key: validUser.activedKey,
      password: validUser.password,
      confirmPassword: "valid_password",
    });
    expect(response).rejects.toEqual(new EmailAlreadyBeingUsed().message);
  });

  test("Should return an user and accessToken", async () => {
    const { encrypter, generateToken, userRepository, senderEmail } = makeSut();
    const createUserUseCase = new CreateUserUseCase(
      encrypter,
      userRepository,
      generateToken,
      senderEmail
    );
    const response = await createUserUseCase.create({
      email: validUser.email,
      name: validUser.name,
      key: validUser.activedKey,
      password: validUser.password,
      confirmPassword: "valid_password",
    });
    expect(response.accessToken).toEqual("token");
    expect(response.user).toEqual(validUser);
  });
});
