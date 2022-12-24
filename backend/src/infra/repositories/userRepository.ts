import { user } from "../../prisma/prisma";
import { data } from "../../protocols/presentational/userCreateData";

export class UserRepository {
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
      data: data,
    });
    return userResponse;
  }
}
