import { emailValidator } from "../../protocols/helpers/emailValidator";
import { data } from "../../protocols/presentational/userCreateData";
import { createUserUseCase } from "../../protocols/useCases/createUserUsecase";
import { InvalidEmailError } from "../../utils/helper/errors/invalidEmail";
import { InvalidParamError } from "../../utils/helper/errors/InvalidParams";
import { NotEqualsError } from "../../utils/helper/errors/notEquals";
import httpResponse from "../../utils/helper/httpResponse";

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
