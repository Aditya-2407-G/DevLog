import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        },
    },
    { 
        timestamps: true 
    }
);

const User = mongoose.model('User', UserSchema);

export default User;
