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
        steamCache: {
            gameData: mongoose.Schema.Types.Mixed,
            steamData: mongoose.Schema.Types.Mixed,
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
