import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../users/user.model";
import { sendResponse } from "../../utils/sendResponse";
import { generateToken } from "../../utils/jwt";
import { config } from "../../config";


const login = asyncHandler(
    async(req : Request , res : Response)=>{
        const {email, password} = req.body;
        const isEmailExit = await User.findOne({email})
        if(!isEmailExit){
            throw new Error("User not found");
        }
        
        const payload = {
            userId : isEmailExit._id,
            email : isEmailExit.email,
            role : isEmailExit.role
        }

        const accessSecret = config.jwt_access_secret;
        const accessExpire = config.jwt_access_expires;

        const refreshSecret = config.jwt_refresh_secret;
        const refreshExpire = config.jwt_refresh_expires;

        const accessToken = generateToken(payload , accessSecret as string , accessExpire as string);
        const refreshToken = generateToken(payload , refreshSecret as string , refreshExpire as string);


        sendResponse(res, {
            statusCode : 200,
            success : true,
            message : "Login successful",
            data : {
                accessToken,
                refreshToken
            }
        })
        
    }
)

export const authController = {
    login,
}