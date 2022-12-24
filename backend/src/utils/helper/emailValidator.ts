import validator from "validator";

export class EmailValidator {
  isValid(email: string) {
    const valid = validator.isEmail(email);
    return valid;
  }
}
