import { EmailValidatorSpy } from "../../mocks/emailValidatorSpy";
import { CreateUserUseCaseSpy } from "../../mocks/useCases/createUser";
import { EmailAlreadyBeingUsed } from "../../utils/errors/emailAlreadyBeingUsed";
import { InvalidEmailError } from "../../utils/errors/invalidEmail";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { NotEqualsError } from "../../utils/errors/notEquals";
import { badRequest, server, success } from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";
import { UserCreateController } from "./create";

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
      key: "",
    });

    expect(response).toEqual(badRequest(new InvalidParamError("name")));
  });

  test("Should return statusCode = 400 if email is not provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "",
      password: "",
      confirmPassword: "",
      key: "",
    });

    expect(response).toEqual(badRequest(new InvalidParamError("email")));
  });
  test("Should return statusCode = 400 if invalid password is provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "",
      confirmPassword: "",
      key: "",
    });

    expect(response).toEqual(badRequest(new InvalidParamError("password")));
  });

  test("Should return statusCode = 400 if invalid confirmPassword is provided ", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "valiid_password",
      confirmPassword: "",
      key: "",
    });

    expect(response).toEqual(
      badRequest(new InvalidParamError("confirmPassword"))
    );
  });
  test("Should return statusCode = 400 if passwords is not equals", async () => {
    const { userCreateController } = makeSut();
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "valid_password",
      confirmPassword: "confirmPassword",
      key: "",
    });

    expect(response).toEqual(badRequest(new NotEqualsError()));
  });

  test("Should return statusCode = 400 if an invalid email is provided", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    emailValidatorSpy.valid = false;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle({
      email: validUser.email,
      name: validUser.name,
      key: validUser.activedKey,
      password: validUser.password,
      confirmPassword: "valid_password",
    });

    expect(response).toEqual(badRequest(new InvalidEmailError()));
  });

  test("Should return an error if email provided is already being used", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    createUserUseCase.emailAlreadyBeingUsed = true;
    createUserUseCase.user = validUser;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle({
      email: validUser.email,
      name: validUser.name,
      key: validUser.activedKey,
      password: validUser.password,
      confirmPassword: "valid_password",
    });
    expect(response).toEqual(server(new EmailAlreadyBeingUsed().message));
  });

  test("Should return an access token and user if user is created with success", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    createUserUseCase.user = validUser;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle({
      email: validUser.email,
      name: validUser.name,
      key: validUser.activedKey,
      password: validUser.password,
      confirmPassword: "valid_password",
    });
    expect(response).toEqual(
      success({
        accessToken: "token",
        user: {
          id: "any_id",
          email: validUser.email,
          name: validUser.name,
          password: validUser.password,
          actived: true,
          activedKey: "valid_key",
        },
      })
    );
  });
});
