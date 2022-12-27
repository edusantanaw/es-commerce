import { userRepository } from "../../../protocols/repository/userRepository";

export class LoadUserUsecase {
  constructor(private userRepository: userRepository) {}
  async loadAll() {
    const users = await this.userRepository.loadAll();
    if (!users) return null;
    return users;
  }
  async loadById(id: string) {
    const user = await this.userRepository.loadById(id);
    if (!user) return null;
    return user;
  }
}
