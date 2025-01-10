import { Strategy as SteamStrategy } from "passport-steam";
import User from "../models/User.js";

export default function configurePassport(passport) {
    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    // Use Steam Strategy
    passport.use(
        new SteamStrategy(
            {
                returnURL: "http://localhost:3000/auth/steam/return",
                realm: "http://localhost:3000/",
                apiKey: process.env.STEAM_API_KEY,
            },
            async (identifier, profile, done) => {
                try {
                    let existingUser = await User.findOne({
                        openId: identifier,
                    });

                    if (!existingUser) {
                        const newUser = new User({
                            steamId: profile.id,
                            openId: identifier,
                            displayName: profile.displayName,
                            avatarUrl: profile.photos[2].value,
                        });
                        await newUser.save();
                        return done(null, newUser);
                    } else {
                        return done(null, existingUser);
                    }
                } catch (error) {
                    console.error("Error finding or saving user", error);
                    return done(error);
                }
            }
        )
    );
}
