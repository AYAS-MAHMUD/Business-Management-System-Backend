import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../users/user.model";
import { sendResponse } from "../../utils/sendResponse";
import { generateToken } from "../../utils/jwt";
import { config } from "../../config";
import bcrypt  from 'bcrypt';
import AppError from "../../../errors/AppError";
import httpStatus  from "http-status";

const login = asyncHandler(
    async(req : Request , res : Response)=>{
        const {email, password} = req.body;
        const isEmailExit = await User.findOne({email}).select("+password")
        if(!isEmailExit){
            throw new Error("User not found")
        }

        const isPasswordMatch = await bcrypt.compare(password , isEmailExit.password as string)
        if(!isPasswordMatch){
            throw new AppError(httpStatus.UNAUTHORIZED,"Invalid Credentials")
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

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.node_env==="production",
            sameSite : "none"
        });
        res.cookie('accessToken',accessToken,{
            httpOnly : true,
            secure : config.node_env === "production",
            sameSite : "none"
        })

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



const logout = asyncHandler(
    async(req : Request, res : Response) =>{
        res.clearCookie("refreshToken",{
            httpOnly : true,
            secure : config.node_env === "production",
            sameSite : "none",

        })
        res.clearCookie("accessToken",{
            httpOnly : true,
            secure : config.node_env === "production",
            sameSite : "none",

        })

        sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "User logout successfully",
            data : null
        })
    }
)
export const authController = {
    login,
    logout,

}