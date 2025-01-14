import express from "express";
import passport from "passport";
import createDemoSession from "../middleware/demoAuth.js";
const router = express.Router();

// @desc    Auth with Steam
// @route   GET /auth/steam
router.get("/steam", passport.authenticate("steam"));

// @desc    Steam auth callback
// @route   GET /auth/steam/return
router.get(
    "/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// @desc    Start demo session
// @route   GET /auth/demo
router.get("/demo", createDemoSession, (req, res) => {
    return res.redirect("/dashboard");
});

// @desc    Logout User
// @route   /auth/logout
router.get("/logout", (req, res, next) => {
    const isDemoUser = req.session.user?._isDemoUser;
    const isSteamUser = req.isAuthenticated();

    if (isDemoUser) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res
                    .status(500)
                    .json({ error: "Failed to end demo session." });
            }
            return res.redirect("/");
        });
    } else if (isSteamUser) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    } else {
        return res.status(400).json({ error: "User is not logged in." });
    }
});

export default router;
