import { Router } from "express";
import adapt from "../adapter/express-adapter";
import { makeSigninfactory } from "../factory/createSigninFactory";
import { makeUserCreateFactory } from "../factory/userCreateFactory";

export default (router: Router) => {
  router.post("/user/create", adapt(makeUserCreateFactory()));
  router.post("/user/signin", adapt(makeSigninfactory()));
};
