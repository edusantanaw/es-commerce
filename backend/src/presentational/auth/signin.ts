import { emailValidator } from "../../protocols/helpers/emailValidator";
import { AuthUseCase } from "../../protocols/useCases/authUsecase";
import { InvalidEmailError } from "../../utils/errors/invalidEmail";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";

interface data {
  email: string;
  password: string;
}

export class SigninController {
  constructor(
    private readonly emailValidator: emailValidator,
    private readonly authUseCase: AuthUseCase
  ) {}

  async handle(data: data) {
    try {
      const { email, password } = data;
      if (!email) return badRequest(new InvalidParamError("email"));
      if (!password) return badRequest(new InvalidParamError("password"));

      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidEmailError());

      const { accessToken, user } = await this.authUseCase.auth(
        email,
        password
      );
      return success({ accessToken, user });
    } catch (error) {
      return server(error);
    }
  }
}
