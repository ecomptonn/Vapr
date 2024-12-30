import mongoose from "mongoose";

const userSchema = {
    steamId: String,
    displayName: String,
    avatar: String,

    friends:[{
        steamId: String,
        displayName: String,
        status: String
    }],

    recentGames: [{
        appId: String,
        name: String,
        playtime: Number
    }],
};
