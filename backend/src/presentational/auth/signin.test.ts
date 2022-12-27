import { EmailValidatorSpy } from "../../mocks/emailValidatorSpy";
import { AuthUseCaseSpy } from "../../mocks/useCases/authUsecase";
import { InvalidEmailError } from "../../utils/errors/invalidEmail";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";
import { SigninController } from "./signin";

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
    expect(response).toEqual(badRequest(new InvalidParamError("email")));
  });

  test("Should return an status code 400 and message error if no password is provided!", async () => {
    const { signinController } = makeSut();
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "",
    });
    expect(response).toEqual(badRequest(new InvalidParamError("password")));
  });

  test("Should return an status code 400 and message error if an invalid email is provided!", async () => {
    const { signinController, emailValidator } = makeSut();
    emailValidator.valid = false;
    const response = await signinController.handle({
      email: "invalid_email",
      password: "valid_password",
    });
    expect(response).toEqual(badRequest(new InvalidEmailError()));
  });

  test("Should throw  an error if user not found", async () => {
    const { signinController, emailValidator } = makeSut();
    emailValidator.valid = true;
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "valid_password",
    });
    expect(response).toEqual(server("User not found!"));
  });

  test("Should throw an invalid password", async () => {
    const { signinController, emailValidator, authUseCase } = makeSut();
    authUseCase.user = validUser;
    emailValidator.valid = true;
    const response = await signinController.handle({
      email: "valid_email@email.com",
      password: "invalid_password",
    });
    expect(response).toEqual(server("Password is invalid!"));
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
      success({ accessToken: "token", user: validUser })
    );
  });
});
