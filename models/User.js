import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    steamId: String,
    displayName: String,
    avatar: String,
    profileUrl: String,

    friends: [{
        steamId: String,
        displayName: String,
        avatar: String,
        status: String,
        currentGame: String,
    }],

    games: [{
        appId: String,
        name: String,
        playtime: Number,
        lastPlayed: Date,
    }],
})