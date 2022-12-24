import { EmailValidatorSpy } from "../../mocks/emailValidatorSpy";
import { CreateUserUseCaseSpy } from "../../mocks/useCases/createUser";
import { EmailAlreadyBeingUsed } from "../../utils/helper/errors/emailAlreadyBeingUsed";
import { InvalidEmailError } from "../../utils/helper/errors/invalidEmail";
import { InvalidParamError } from "../../utils/helper/errors/InvalidParams";
import { NotEqualsError } from "../../utils/helper/errors/notEquals";
import httpResponse from "../../utils/helper/httpResponse";
import { UserCreateController } from "./create";

const validUser = {
  id: "any_id",
  name: "valid_name",
  email: "invalid_email",
  password: "valid_password",
  confirmPassword: "valid_password",
};

function makeSut() {
  const emailValidatorSpy = new EmailValidatorSpy();
  const createUserUseCase = new CreateUserUseCaseSpy();
  const userCreateController = new UserCreateController(
    emailValidatorSpy,
    createUserUseCase
  );
  return { userCreateController, createUserUseCase, emailValidatorSpy };
}

describe("first", () => {
  test("Should return statusCode = 400 if name is not provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("name"))
    );
  });

  test("Should return statusCode = 400 if email is not provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "",
      password: "",
      confirmPassword: "",
    });

    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("email"))
    );
  });
  test("Should return statusCode = 400 if invalid password is provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "",
      confirmPassword: "",
    });

    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("password"))
    );
  });

  test("Should return statusCode = 400 if invalid confirmPassword is provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "valiid_password",
      confirmPassword: "",
    });

    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("confirmPassword"))
    );
  });
  test("Should return statusCode = 400 if passwords is not equals", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "valid_password",
      confirmPassword: "confirmPassword",
    });

    expect(response).toEqual(httpResponse.badRequest(new NotEqualsError()));
  });

  test("Should return statusCode = 400 if an invalid email is provided", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    emailValidatorSpy.valid = false;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle(validUser);

    expect(response).toEqual(httpResponse.badRequest(new InvalidEmailError()));
  });

  test("Should return an error if email provided is already being used", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    createUserUseCase.emailAlreadyBeingUsed = true;
    createUserUseCase.user = validUser;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle(validUser);
    expect(response).toStrictEqual(
      httpResponse.badRequest(new EmailAlreadyBeingUsed())
    );
  });

  test("Should return an access token and user if user is created with success", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    createUserUseCase.user = validUser;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle(validUser);
    expect(response).toEqual({ accessToken: "token", user: validUser });
  });
});
