import { user } from "../../protocols/entity/user";
import { data } from "../../protocols/presentational/userCreateData";
import { EmailAlreadyBeingUsed } from "../../utils/helper/errors/emailAlreadyBeingUsed";
import httpResponse from "../../utils/helper/httpResponse";

export class CreateUserUseCaseSpy {
  user: user | null = null;
  accessToken = "token";
  emailAlreadyBeingUsed = false;
  async create(data: data) {
    if (!this.user) throw "";
    this.emailAlreadyBeingUsed;
    if (this.emailAlreadyBeingUsed)
      throw httpResponse.badRequest(new EmailAlreadyBeingUsed());
    return { user: this.user, accessToken: this.accessToken };
  }
}
