import { Router } from "express";
import adapt from "../adapter/express-adapter";
import { makeCreateCategory } from "../factory/controllers/category/createFactory";
import { makeLoadAllCategory } from "../factory/controllers/category/loadAll";

export default (router: Router) => {
  router.post("/category", adapt(makeCreateCategory()));
  router.get("/category", adapt(makeLoadAllCategory()));
};
