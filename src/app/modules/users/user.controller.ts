import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";



const register = asyncHandler(
    async(req:Request, res : Response)=>{

        const result = await userService.register(req.body);

        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "User Register successfully",
            data : result
        })
    }
)



export const userController = {
    register,
    
}