import { activeUseCase } from "../../protocols/useCases/activeUser";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";

export class ActiveUser {
  constructor(private activeUseCase: activeUseCase) {}
  async handle(data: { userId: string; key: string }) {
    try {
      const { userId, key } = data;
      if (!userId)
        return httpResponse.badRequest(new InvalidParamError("userId"));

      if (!key) return httpResponse.badRequest(new InvalidParamError("key"));

      await this.activeUseCase.active(userId, key);

      return httpResponse.success(true);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
