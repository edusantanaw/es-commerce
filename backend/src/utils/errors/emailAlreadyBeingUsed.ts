export class EmailAlreadyBeingUsed extends Error {
  constructor() {
    super(`Email is already being used!`);
    this.name = "EmailAlreadyBeingUsed";
  }
}
