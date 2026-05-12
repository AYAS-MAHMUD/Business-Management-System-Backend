import { IAuthProvider, IUser } from "./user.interface"
import bcrypt from "bcrypt"
import { User } from "./user.model";


const register = async(payload : Partial<IUser>)=>{
    const {email , password , ...rest} = payload;
    const isExistEmail  = await User.findOne({email});
    if(isExistEmail){
        throw new Error("User already Exit!")
    }
    const hashPassword =await bcrypt.hash(password as string,10);
    
    const authProvider :IAuthProvider = {
        provider : "credentials",
        providerId : email as string
    }
    const user = await User.create({
        email,
        password : hashPassword,
        auth : [authProvider],
        ...rest
    })
    
    return user

}



export const userService = {
    register,

}