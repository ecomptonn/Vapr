import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    steamId: {
        type: String,
        unique: true,
    },
    displayName: String,
    avatarUrl: String,
    lastLogin: {
        type: Date,
        default: Date.now,
    },
});
