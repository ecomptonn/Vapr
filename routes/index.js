import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import demoUser from "../data/demoUser.js";
const router = express.Router();

// Import steam service
import {
    fetchFriendList,
    fetchGameDetails,
    fetchSteamUserData,
    fetchRecentlyPlayedGames,
} from "../services/steamService.js";

// @desc    Login Page
// @route   GET /
router.get("/", (req, res) => {
    res.render("pages/auth/login", {
        layout: "login",
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const user = req.user || req.session.user;

        // Fetch user's steam data if not already in session or needs update
        if (!user.steamData) {
            try {
                // Get user's Steam data
                const steamData = await fetchSteamUserData(user.steamId);

                // Get user's friends with their profiles
                steamData.friends = await fetchFriendList(user.steamId);

                // Get user's recently played games
                steamData.recentGames = await fetchRecentlyPlayedGames(
                    user.steamId
                );

                // Save to session
                user.steamData = steamData;
            } catch (steamError) {
                console.error("Error fetching Steam data:", steamError);
                // Continue with whatever data we have
            }
        }

        res.render("pages/dashboard/home", { user });
    } catch (error) {
        console.error(error);
        res.render("errors/500");
    }
});

// @desc    Demo Dashboard
// @route   GET /demo
router.get("/demo", (req, res) => {
    if (!req.session.user) {
        req.session.user = demoUser;
    }

    const user = req.session.user;
    res.render("pages/demo/home", { user });
});

// @desc    Demo Friends
// @route   GET /demo/friends
router.get("/demo/friends", (req, res) => {
    if (!req.session.user) {
        req.session.user = demoUser;
    }

    const user = req.session.user;
    res.render("pages/demo/friends", { user });
});

// @desc    Demo Friend Detail Page
// @route   GET /demo/friends/:friendName
router.get("/demo/friend/:friendName", (req, res) => {
    if (!req.session.user) {
        req.session.user = demoUser;
    }

    const user = req.session.user;
    const { friendName } = req.params;

    // Find the friend in the user's friends list
    const friend = user.friends.find((f) => f.displayName === friendName);

    if (!friend) {
        return res.status(404).render("errors/404");
    }

    res.render("pages/demo/friend-detail", {
        user,
        friend,
        title: `${friend.displayName}'s Game Stats`,
    });
});

// @desc    Friends
// @route   GET /friends
router.get("/friends", ensureAuth, (req, res) => {
    res.render("pages/dashboard/friends");
});

// @desc    Demo Stats
// @route   GET /demo/stats
router.get("/demo/stats", (req, res) => {
    if (!req.session.user) {
        req.session.user = demoUser;
    }

    const user = req.session.user;
    res.render("pages/demo/stats", { user });
});

// @desc    Stats
// @route   GET /stats
router.get("/stats", ensureAuth, (req, res) => {
    res.render("pages/dashboard/stats", { user: req.session.user });
});

// @desc    Privacy Page
// @route   GET /privacy
router.get("/privacy", (req, res) => {
    res.render("pages/privacy", {
        layout: "policy",
    });
});

export default router;
