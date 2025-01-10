import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        steamId: {
            type: String,
            required: true,
            unique: true,
        },
        openId: { type: String, unique: true },
        displayName: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
