import {z} from "zod"
import { Role } from "./user.interface";


const authProviderValidationSchema = z.object({
  providerId: z.string(),
  provider: z.string(),
});


export const createUserValidation = z.object({
  body: z.object({
    name : z.string()
    .min(2,{message : "Name must be at least 2 Character"})
    .max(50,{message : "Name can't exceed 50 characters"}),

    email: z.string().email(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    phone: z.string().optional(),

    address: z
      .string()
      .max(200, { message: "Address can't exceed 200 characters" })
      .optional(),

    role: z.nativeEnum(Role).optional(),

    profileImage: z.string().optional(),

    isBlocked: z.boolean().optional(),

    isDeleted: z.boolean().optional(),

    isVerified: z.boolean().optional(),

    auth: z.array(authProviderValidationSchema).optional(),

    lastLogin: z.string().datetime().optional(),
  }),
});




export const updateUserValidation = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),

    email: z.string().email().optional(),

    password: z.string().min(8).optional(),

    phone: z.string().optional(),

    address: z.string().max(200).optional(),

    role: z.nativeEnum(Role).optional(),

    profileImage: z.string().optional(),

    isBlocked: z.boolean().optional(),

    isDeleted: z.boolean().optional(),

    isVerified: z.boolean().optional(),

    auth: z.array(authProviderValidationSchema).optional(),

    lastLogin: z.string().datetime().optional(),
  }),
});