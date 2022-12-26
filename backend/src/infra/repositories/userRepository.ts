import { user } from "../../prisma/prisma";
import { data } from "../../protocols/presentational/userCreateData";
import { userRepository } from "../../protocols/repository/userRepository";

export class UserRepository implements userRepository {
  async loadByEmail(email: string) {
    const userResponse = await user.findFirst({
      where: {
        email: email,
      },
    });
    return userResponse;
  }
  async create(data: data) {
    const userResponse = await user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        activedKey: data.key,
      },
    });
    return userResponse;
  }

  async loadById(id: string) {
    const userResponse = await user.findFirst({
      where: {
        id: id,
      },
    });
    return userResponse;
  }

  async activeUser(userId: string) {
    await user.update({
      where: {
        id: userId,
      },
      data: {
        actived: true,
      },
    });
  }
}
