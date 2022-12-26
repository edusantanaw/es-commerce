import { user } from "../../domain/entities/user";

export class ActiveUseCase {
  user: user | null = null;
  keyIsValid = false;
  async active(userId: string, key: string) {
    if (!this.user) throw "User not found!";
    if (!this.keyIsValid) throw "Key is not valid!";
    return;
  }
}
