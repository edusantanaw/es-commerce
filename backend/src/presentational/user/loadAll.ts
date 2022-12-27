import { loadUserUsecase } from "../../protocols/useCases/loadUser";
import { notContent, server, success } from "../../utils/helper/httpResponse";

export class LoadAllUsers {
  constructor(private loadUserUsecase: loadUserUsecase) {}
  async handle() {
    try {
      const users = await this.loadUserUsecase.loadAll();
      if (!users) return notContent("users");
      return success(users);
    } catch (error) {
      return server(error);
    }
  }
}
