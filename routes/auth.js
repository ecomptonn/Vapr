import express from "express";
import passport from "passport";
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

// @desc    Logout User
// @route   /auth/logout
router.get("/logout", (req, res, next) => {
    // Handle demo user logout
    if (req.session.user && !req.session.passport) {
        req.session.destroy((err) => {
            if (err) return next(err);
            return res.redirect("/");
        });
    }
    // Handle Steam user logout
    else {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect("/");
        });
    }
});

export default router;
