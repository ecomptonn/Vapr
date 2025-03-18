import { Strategy as SteamStrategy } from "passport-steam";
import User from "../models/User.js";

export default function configurePassport(passport) {
    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        // Only store the user ID in the session
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            // Fetch the user from the database when needed
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error in deserializeUser:", error);
            done(error);
        }
    });

    // Use Steam Strategy
    passport.use(
        new SteamStrategy(
            {
                returnURL:
                    "https://vapr-5a2f79f96cb3.herokuapp.com/auth/steam/return",
                realm: "https://vapr-5a2f79f96cb3.herokuapp.com/",
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
