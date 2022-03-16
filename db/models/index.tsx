import mongoose from "mongoose";
import UserSchema from "./User.model";


export const User = mongoose.models.User || mongoose.model("User", UserSchema);