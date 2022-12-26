import { user } from "../../domain/entities/user";
import { data } from "../../protocols/presentational/userCreateData";
import { validUser } from "../../utils/helper/validUser";

export class UserRepositorySpy {
  user: user | null = null;
  async loadByEmail(email: string) {
    if (this.user) return this.user;
    return null;
  }
  async create(data: data) {
    return (this.user = validUser);
  }

  async loadById(id: string) {
    return this.user;
  }

  async activeUser(userId: string) {}
}
