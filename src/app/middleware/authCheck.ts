import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import { config } from "../config";


export const authCheck =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new Error('Token not Received');
      }
      const verifiedToken = jwt.verify(
        accessToken,
        config.jwt_access_secret as string,
      );
      // console.log(verifiedToken)
      if (!roles.includes((verifiedToken as JwtPayload).role)) {
        throw new Error('Unauthorized Access !');
      }
      // req.user = verifiedToken as JwtPayload;
      
      next();
    } catch (error) {
      next(error);
    }
  };
