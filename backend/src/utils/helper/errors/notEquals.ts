export class NotEqualsError extends Error {
  constructor() {
    super(`Passwords must be equals`);
    this.name = "NotEqualsError";
  }
}
