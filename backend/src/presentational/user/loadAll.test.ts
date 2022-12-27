import { LoadUserUsecaseSpy } from "../../mocks/useCases/loadUser";
import { notContent, success } from "../../utils/helper/httpResponse";
import { validUser } from "../../utils/helper/validUser";
import { LoadAllUsers } from "./loadAll";

function makeSut() {
  const loadUserUsecase = new LoadUserUsecaseSpy();
  const loadAllUsers = new LoadAllUsers(loadUserUsecase);
  return { loadAllUsers, loadUserUsecase };
}

describe("Load all users", () => {
  test("Should return status 204 if users not found", async () => {
    const { loadAllUsers } = makeSut();
    const response = await loadAllUsers.handle();
    expect(response).toEqual(notContent("users"));
  });
  test("Should return status 200 and users if users found", async () => {
    const { loadAllUsers, loadUserUsecase } = makeSut();
    loadUserUsecase.users = [validUser, validUser];
    const response = await loadAllUsers.handle();
    expect(response).toEqual(success([validUser, validUser]));
  });
});
