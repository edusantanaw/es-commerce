import { Request, Response } from "express";
import { Controller } from "../../protocols/express-adapter";

const adapt = (method: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await method.handle({
      ...req.body,
      ...req.params,
      ...req.query,
      req,
    });
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export default adapt;
