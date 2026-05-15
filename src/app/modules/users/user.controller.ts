import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";
import { config } from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken"


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
const getAllUser = asyncHandler(
    async(req:Request, res : Response)=>{

        const result = await userService.getAllUser();

        sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "All User Retrieve successfully",
            meta : result.meta,
            data : result.user
        })
    }
)

const updateUser = asyncHandler(
    async(req:Request, res : Response)=>{
        
        const token = req.headers.authorization as string;
        const decodedtoken = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;
        
        const id = req.params.id as string;
        const body = req.body;
        
        
        const user = await userService.updateUser(decodedtoken,id,body)
        sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "User update successfully",
            data : user
        })
    }
)



const getSingleUser = asyncHandler(
    async(req:Request, res : Response)=>{
        const id = req.params.id as string;
        const result = await userService.getSingleUser(id);

        sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "Single User Retrieve successfully",
            data : result
        })
    }
)



const getMe = asyncHandler(
    async(req:Request, res : Response)=>{
        const id = req.user.id;
        const result = await userService.getSingleUser(id);

        sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "Single User Retrieve successfully",
            data : result
        })
    }
)


export const userController = {
    register,
    getAllUser,
    updateUser,
    getSingleUser,
    getMe,
}