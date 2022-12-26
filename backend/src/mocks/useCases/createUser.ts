import { user } from "../../domain/entities/user";
import { data } from "../../protocols/presentational/userCreateData";
import { EmailAlreadyBeingUsed } from "../../utils/errors/emailAlreadyBeingUsed";

export class CreateUserUseCaseSpy {
  user: user | null = null;
  accessToken = "token";
  emailAlreadyBeingUsed = false;
  async create(data: data) {
    if (!this.user) throw "";
    this.emailAlreadyBeingUsed;
    if (this.emailAlreadyBeingUsed) throw new EmailAlreadyBeingUsed().message;
    return { user: this.user, accessToken: this.accessToken };
  }
}
