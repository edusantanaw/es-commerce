import { userRepository } from "../../../protocols/repository/userRepository";

export class ActiveUseCase {
  constructor(private readonly userRepository: userRepository) {}

  async active(userId: string, key: string) {
    const user = await this.userRepository.loadById(userId);
    if (!user) throw "User not found!";
    if (user.activedKey !== key) throw "Key is not valid!";
    await this.userRepository.activeUser(userId);
    return true;
  }
}
