import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import { config } from "../config";
import AppError from "../../errors/AppError";
import  httpStatus  from "http-status";

  export const authCheck =
  (...roles: string[]) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const authorizationToken = req.headers.authorization;

      if (!authorizationToken) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized"
        );
      }

      // const token = authorizationToken.split(" ")[1]; // if the token will give beerer

      const verifiedToken = jwt.verify(
        authorizationToken,
        config.jwt_access_secret as string
      ) as JwtPayload;

      req.user = verifiedToken;

      if (
        roles.length &&
        !roles.includes(verifiedToken.role)
      ) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Forbidden Access"
        );
      }

      next();

    } catch (error) {
      next(error);
    }
  };