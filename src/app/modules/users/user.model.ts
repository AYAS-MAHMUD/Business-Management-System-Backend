import { Schema, model } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    role: {type : String , enum : Object.values(Role) , default : Role.CUSTOMER},

    profileImage: {
      type: String,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey : false
  }
);

export const User =  model<IUser>("User",userSchema)


// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 10);

//   next();
// });