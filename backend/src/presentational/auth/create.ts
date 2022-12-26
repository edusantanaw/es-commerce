import { emailValidator } from "../../protocols/helpers/emailValidator";
import { data } from "../../protocols/presentational/userCreateData";
import { createUserUseCase } from "../../protocols/useCases/createUserUsecase";
import { InvalidEmailError } from "../../utils/errors/invalidEmail";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { NotEqualsError } from "../../utils/errors/notEquals";
import httpResponse from "../../utils/helper/httpResponse";

export class UserCreateController {
  constructor(
    private emailValidator: emailValidator,
    private createUserUseCase: createUserUseCase
  ) {}

  async handle(data: data) {
    try {
      const { name, email, password, confirmPassword } = data;
      if (!name) return httpResponse.badRequest(new InvalidParamError("name"));

      if (!email)
        return httpResponse.badRequest(new InvalidParamError("email"));

      if (!password)
        return httpResponse.badRequest(new InvalidParamError("password"));

      if (!confirmPassword)
        return httpResponse.badRequest(
          new InvalidParamError("confirmPassword")
        );

      if (password !== confirmPassword)
        return httpResponse.badRequest(new NotEqualsError());

      if (!this.emailValidator.isValid(email))
        return httpResponse.badRequest(new InvalidEmailError());

      const { accessToken, user } = await this.createUserUseCase.create(data);
      return httpResponse.success({ accessToken, user });
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
