import { user } from "../../domain/entities/user";

export class LoadUserUsecaseSpy {
  user: user | null = null;
  users: user[] | null = null;
  async loadById(id: string) {
    return this.user;
  }

  async loadAll() {
    return this.users;
  }
}
