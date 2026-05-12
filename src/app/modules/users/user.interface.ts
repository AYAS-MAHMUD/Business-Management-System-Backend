import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE",
    CUSTOMER = "CUSTOMER"
}
export interface IAuthProvider {
  providerId: string;
  provider: 'google' | 'credentials';
}

export interface IUser {
  name: string;

  email: string;

  password?: string;

  phone?: string;

  address?: string;

  role: Role;

  profileImage?: string;

  isBlocked?: boolean;

  isDeleted?: boolean;

  isVerified?: boolean;

  lastLogin?: Date;
  auth: IAuthProvider[];
  createdAt?: Date;

  updatedAt?: Date;
}