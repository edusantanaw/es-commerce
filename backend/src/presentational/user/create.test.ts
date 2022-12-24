import { InvalidEmailError } from "../../utils/helper/errors/invalidEmail";
import { InvalidParamError } from "../../utils/helper/errors/InvalidParams";
import { NotEqualsError } from "../../utils/helper/errors/notEquals";
import httpResponse from "../../utils/helper/httpResponse";

interface data {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface emailValidator {
  isValid: (email: string) => boolean;
}
type user = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface createUserUseCase {
  create: (data: data) => Promise<{ accessToken: string; user: user }>;
}

export class UserCreateController {
  constructor(
    private emailValidator: emailValidator,
    private createUserUseCase: createUserUseCase
  ) {}

  async handle(data: data) {
    try {
      this.validate(data);
      const { accessToken, user } = await this.createUserUseCase.create(data);
      return { accessToken, user };
    } catch (error) {
      return error;
    }
  }

  validate(data: data) {
    const { name, email, password, confirmPassword } = data;
    if (!name) throw httpResponse.badRequest(new InvalidParamError("name"));

    if (!email) throw httpResponse.badRequest(new InvalidParamError("email"));

    if (!password)
      throw httpResponse.badRequest(new InvalidParamError("password"));

    if (!confirmPassword)
      throw httpResponse.badRequest(new InvalidParamError("confirmPassword"));

    if (password !== confirmPassword)
      throw httpResponse.badRequest(new NotEqualsError());

    if (!this.emailValidator.isValid(email))
      throw httpResponse.badRequest(new InvalidEmailError());
  }
}

class EmailValidatorSpy implements emailValidator {
  valid = false;
  isValid(email: string) {
    return this.valid;
  }
}

class CreateUserUseCaseSpy {
  user: user | null = null;
  accessToken = "token";
  async create(data: data) {
    if (!this.user) throw "";
    return { user: this.user, accessToken: this.accessToken };
  }
}

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

  test("Should return statusCode = 400 if passwords is not equals", async () => {
    const { emailValidatorSpy, createUserUseCase } = makeSut();
    emailValidatorSpy.valid = false;
    const userCreateController = new UserCreateController(
      emailValidatorSpy,
      createUserUseCase
    );
    const response = await userCreateController.handle({
      name: "valid_name",
      email: "invalid_email",
      password: "valid_password",
      confirmPassword: "valid_password",
    });

    expect(response).toEqual(httpResponse.badRequest(new InvalidEmailError()));
  });
});
