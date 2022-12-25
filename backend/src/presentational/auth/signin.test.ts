import { user } from "../../domain/entities/user";
import { EmailValidatorSpy } from "../../mocks/emailValidatorSpy";
import { emailValidator } from "../../protocols/helpers/emailValidator";
import { InvalidEmailError } from "../../utils/helper/errors/invalidEmail";
import { InvalidParamError } from "../../utils/helper/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";

interface data {
  email: string;
  password: string;
}

class AuthUseCaseSpy implements AuthUseCase {
  token = "token";
  user: user | null = null;
  passIsValid = false;
  async auth(email: string, password: string) {
    this.user;
    this.token;
    if (this.user) {
      if (this.passIsValid) {
        return { user: this.user, accessToken: this.token };
      }
      throw "Password is invalid!";
    }
    throw "User not found!";
  }
}

interface AuthUseCase {
  auth: (
    email: string,
    password: string
  ) => Promise<{ accessToken: string; user: user }>;
}

class SigninController {
  constructor(
    private readonly emailValidator: emailValidator,
    private readonly authUseCase: AuthUseCase
  ) {}

  async handle(data: data) {
    try {
      const { email, password } = data;
      if (!email)
        return httpResponse.badRequest(new InvalidParamError("email"));
      if (!password)
        return httpResponse.badRequest(new InvalidParamError("password"));

      if (!this.emailValidator.isValid(email))
        return httpResponse.badRequest(new InvalidEmailError());

      const { accessToken, user } = await this.authUseCase.auth(
        email,
        password
      );
      return httpResponse.success({ accessToken, user });
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}

function makeSut() {
  const emailValidator = new EmailValidatorSpy();
  const authUseCase = new AuthUseCaseSpy();
  const signinController = new SigninController(emailValidator, authUseCase);
  return { emailValidator, signinController, authUseCase };
}

describe("Signin controller", () => {
  test("Should return an status code 400 and message error if no email is provided!", async () => {
    const { signinController } = makeSut();
    const response = await signinController.handle({ email: "", password: "" });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("email"))
    );
  });

  test("Should return an status code 400 and message error if no password is provided!", async () => {
    const { signinController } = makeSut();
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "",
    });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("password"))
    );
  });

  test("Should return an status code 400 and message error if an invalid email is provided!", async () => {
    const { signinController, emailValidator } = makeSut();
    emailValidator.valid = false;
    const response = await signinController.handle({
      email: "invalid_email",
      password: "valid_password",
    });
    expect(response).toEqual(httpResponse.badRequest(new InvalidEmailError()));
  });

  test("Should throw  an error if user not found", async () => {
    const { signinController, emailValidator } = makeSut();
    emailValidator.valid = true;
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "valid_password",
    });
    expect(response).toEqual(httpResponse.catch("User not found!"));
  });

  test("Should throw an invalid password", async () => {
    const { signinController, emailValidator, authUseCase } = makeSut();
    authUseCase.user = validUser;
    emailValidator.valid = true;
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "invalid_password",
    });
    expect(response).toEqual(httpResponse.catch("Password is invalid!"));
  });
  test("Should return access token and an user if user is authenticated", async () => {
    const { signinController, emailValidator, authUseCase } = makeSut();
    authUseCase.user = validUser;
    emailValidator.valid = true;
    authUseCase.passIsValid = true;
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "invalid_password",
    });
    expect(response).toEqual(
      httpResponse.success({ accessToken: "token", user: validUser })
    );
  });
});
