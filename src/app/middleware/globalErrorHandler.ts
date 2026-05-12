import { NextFunction, Request, Response } from "express";
import { config } from "../config";


export const globalErrorHanlder = (err:any, req:Request,res:Response,next:NextFunction)=>{
     console.error(err);

  if (config.node_env === 'developmnet') {
    console.log(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
    success: false,
    message,
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
}