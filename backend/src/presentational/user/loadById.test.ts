import { LoadUserUsecaseSpy } from "../../mocks/useCases/loadUser";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  success,
} from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";
import { LoadUserById } from "./loadUserById";

function makeSut() {
  const loadUserUsecaseSpy = new LoadUserUsecaseSpy();
  const loadUserById = new LoadUserById(loadUserUsecaseSpy);
  return { loadUserUsecaseSpy, loadUserById };
}

describe("Load user by id", () => {
  test("Should return status 400 if id is not provided", async () => {
    const { loadUserById } = makeSut();
    const response = await loadUserById.handle({ id: "" });
    expect(response).toEqual(badRequest(new InvalidParamError("id")));
  });
  test("Should return status 204 if user is not found", async () => {
    const { loadUserById } = makeSut();
    const response = await loadUserById.handle({ id: "any_id" });
    expect(response).toEqual(notContent("user"));
  });
  test("Should return status 200 and a user if user is found", async () => {
    const { loadUserById, loadUserUsecaseSpy } = makeSut();
    loadUserUsecaseSpy.user = validUser;
    const response = await loadUserById.handle({ id: "any_id" });
    expect(response).toEqual(success(validUser));
  });
});
