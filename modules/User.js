import mongoose from "mongoose";

const UserCollection = 'usuarios1';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        
    },
    {timestamps: true}
)

const userModel = mongoose.model(UserCollection, UserSchema);

export {userModel}