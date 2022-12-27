import { SigninController } from "../../../../presentational/auth/signin";
import { EmailValidator } from "../../../../utils/helper/emailValidator";
import { makeAuthUseCase } from "../../usecases/auth";

export function makeSigninfactory() {
  const authUseCase = makeAuthUseCase();
  const emailValidator = new EmailValidator();
  const signController = new SigninController(emailValidator, authUseCase);
  return signController;
}
