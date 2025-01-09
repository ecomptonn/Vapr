import { Strategy as SteamStrategy } from "passport-steam";

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
                apiKey: `${process.env.STEAM_API_KEY}`,
            },
            function (identifier, profile, done) {
                User.findByOpenID({ openId: identifier }, function (err, user) {
                    return done(err, user);
                });
            }
        )
    );
}
