import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    steamId: String,
    displayName: String,
    avatar: String, // URL to steam profile pic
    profileUrl: String, // Steam custom profile url

    friends: [{
        steamId: String,
        displayName: String,
        avatar: String, // URL to friends profile pic
        status: String, // online, offline, etc
        currentGame: String, // current game friend is playing
    }],

    games: [{
        appId: String, // Steam's game ID
        name: String, // Name of steam game
        playtime: Number, // total minutes played
        lastPlayed: Date, // last time played
    }],
})