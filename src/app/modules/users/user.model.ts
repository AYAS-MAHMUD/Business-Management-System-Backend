import { Schema, model } from "mongoose";
import { IAuthProvider, IUser, Role } from "./user.interface";



const authProviderSchema = new Schema<IAuthProvider>(
  {
    providerId: { type: String, required: true },
    provider: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
    
  },
);




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
    auth : [authProviderSchema],
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