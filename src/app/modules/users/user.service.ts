import { IAuthProvider, IUser, Role } from "./user.interface"
import bcrypt from "bcrypt"
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";


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


const getAllUser = async()=>{
    const user = await User.find();
    const count = await User.countDocuments()
    return {
        meta : {
            total : count
        },
        user
    };
}

const getSingleUser = async(id : string)=>{

    const user = await User.findById(id);

    return user
}


const updateUser = async(token : JwtPayload,id : string, payload : Partial<IUser>)=>{

    if(payload.role){
        if(token.role === Role.CUSTOMER || token.role === Role.EMPLOYEE){
            throw new Error("Only Admin and manager can update role");
            
        }
    }
    if(payload.email){
        throw new Error("Email can't be change")
        
    }

    if(payload.password){
        const hashPass = await bcrypt.hash(payload.password , 10);
        payload.password = hashPass
    }

    const updateUser = await User.findByIdAndUpdate(id, payload,{
        runValidators : true,
        new : true
    })

    return updateUser

}



export const userService = {
    register,
    getAllUser,
    updateUser,
    getSingleUser, 

}