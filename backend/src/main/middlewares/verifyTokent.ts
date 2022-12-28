import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function getToken(req: Request) {
  const authorization = req.headers.authorization;
  if (!authorization) throw "Authorization is invalid!";
  const token = authorization.split(" ")[1];
  const decodedId = await jwt.verify(token, "secret");
  return decodedId;
}

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await getToken(req);
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
}
