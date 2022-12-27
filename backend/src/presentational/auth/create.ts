import { emailValidator } from "../../protocols/helpers/emailValidator";
import { data } from "../../protocols/presentational/userCreateData";
import { createUserUseCase } from "../../protocols/useCases/createUserUsecase";
import { InvalidEmailError } from "../../utils/errors/invalidEmail";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { NotEqualsError } from "../../utils/errors/notEquals";
import { badRequest, server, success } from "../../utils/helper/httpResponse";

export class UserCreateController {
  constructor(
    private emailValidator: emailValidator,
    private createUserUseCase: createUserUseCase
  ) {}

  async handle(data: data) {
    try {
      const { name, email, password, confirmPassword } = data;
      if (!name) return badRequest(new InvalidParamError("name"));

      if (!email) return badRequest(new InvalidParamError("email"));

      if (!password) return badRequest(new InvalidParamError("password"));

      if (!confirmPassword)
        return badRequest(new InvalidParamError("confirmPassword"));

      if (password !== confirmPassword) return badRequest(new NotEqualsError());

      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidEmailError());

      const { accessToken, user } = await this.createUserUseCase.create(data);
      return success({ accessToken, user });
    } catch (error) {
      return server(error);
    }
  }
}
