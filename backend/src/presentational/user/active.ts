import { activeUseCase } from "../../protocols/useCases/activeUser";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest, server, success } from "../../utils/helper/httpResponse";

export class ActiveUser {
  constructor(private activeUseCase: activeUseCase) {}
  async handle(data: { userId: string; key: string }) {
    try {
      const { userId, key } = data;
      if (!userId) return badRequest(new InvalidParamError("userId"));

      if (!key) return badRequest(new InvalidParamError("key"));

      await this.activeUseCase.active(userId, key);

      return success(true);
    } catch (error) {
      return server(error);
    }
  }
}
