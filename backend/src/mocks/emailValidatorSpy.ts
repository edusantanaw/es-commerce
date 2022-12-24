import { emailValidator } from "../protocols/helpers/emailValidator";

export class EmailValidatorSpy implements emailValidator {
  valid = true;
  isValid(email: string) {
    return this.valid;
  }
}
