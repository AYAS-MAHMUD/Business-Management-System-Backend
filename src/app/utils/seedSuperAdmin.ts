import { config } from "../config"
import { IAuthProvider, IUser, Role } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";
import bcrypt from "bcrypt"

export const seedSuperAdmin = async ()=>{


    try {
        const email  = config.super_admin_email;
        const password = config.super_admin_password as string;

        const hashPassword = await bcrypt.hash(password,10)
        const isUserExit = await User.findOne({email});

        if(isUserExit){
            console.log("Super Admin Already Exit");
            return
        }
        const authProvider:IAuthProvider = {
            provider : "credentials",
            providerId : email as string
        }
        const adminPayload : IUser = {
            name : "Super Admin",
            email : email as string,
            password : hashPassword ,
            auth : [authProvider],
            isVerified : true,
            role : Role.ADMIN

        }

        await User.create(adminPayload)
        console.log("Super Admin Created successfully");

    } catch (error) {
        console.error('❌ Failed to seed super admin:', error);
    }
}