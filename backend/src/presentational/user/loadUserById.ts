import { loadUserUsecase } from "../../protocols/useCases/loadUser";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  success,
} from "../../utils/helper/httpResponse";

export class LoadUserById {
  constructor(private readonly loadUserUsecase: loadUserUsecase) {}
  async handle({ id }: { id: string }) {
    if (!id) return badRequest(new InvalidParamError("id"));
    const user = await this.loadUserUsecase.loadById(id);
    if (!user) return notContent("user");
    return success(user);
  }
}
