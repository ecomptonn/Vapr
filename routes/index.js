import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import demoUser from "../data/demoUser.js";
import User from "../models/User.js";
const router = express.Router();

// Import steam service
import {
    fetchFriendList,
    fetchGameDetails,
    fetchOwnedGames,
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
        const user = req.user;
        const steamId = user.steamId;

        // Get the full user document from MongoDB
        const userDoc = await User.findById(user._id);

        // Check if we need to update Steam data (older than 24 hours)
        const needsUpdate =
            !userDoc.steamCache?.gameData ||
            !userDoc.steamCache?.timestamp ||
            Date.now() - new Date(userDoc.steamCache.timestamp).getTime() >
                24 * 60 * 60 * 1000;

        if (needsUpdate) {
            try {
                // Fetch Steam data
                const gameData = await fetchOwnedGames(steamId);

                if (gameData && gameData.response && gameData.response.games) {
                    // Format games with additional useful data
                    const formattedGames = gameData.response.games.map(
                        (game) => ({
                            ...game,
                            playtime_forever_hours: (
                                game.playtime_forever / 60
                            ).toFixed(1),
                            playtime_2weeks_hours: game.playtime_2weeks
                                ? (game.playtime_2weeks / 60).toFixed(1)
                                : 0,
                            header_image: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
                            last_played_date: game.rtime_last_played
                                ? new Date(
                                      game.rtime_last_played * 1000
                                  ).toLocaleDateString()
                                : "Never",
                        })
                    );

                    // Sort by last played time (most recent first)
                    formattedGames.sort((a, b) => {
                        const timeA = a.rtime_last_played || 0;
                        const timeB = b.rtime_last_played || 0;
                        return timeB - timeA;
                    });

                    // Update games in response
                    gameData.response.games = formattedGames;

                    // Get recent games (up to 6)
                    const recentGames = formattedGames
                        .filter((game) => game.rtime_last_played)
                        .slice(0, 6);

                    // Fetch friends list
                    const friends = await fetchFriendList(steamId);

                    // Update the user document
                    userDoc.steamCache = {
                        gameData: gameData,
                        steamData: {
                            friends: friends,
                            recentGames: {
                                response: {
                                    games: recentGames,
                                },
                            },
                        },
                        timestamp: new Date(),
                    };

                    // Save the updated document
                    await userDoc.save();
                }
            } catch (error) {
                console.error("Error fetching/processing Steam data:", error);
            }
        }

        // Convert Mongoose document to plain JavaScript object to avoid Handlebars warnings
        const userObj = userDoc.toObject();

        // Render the dashboard with user data
        res.render("pages/dashboard/home", {
            user: userObj,
            gameData: userObj.steamCache?.gameData,
            steamData: userObj.steamCache?.steamData,
        });
    } catch (error) {
        console.error("Dashboard route error:", error);
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

// @desc debug user
// @route GET /debug
router.get("/debug/user", (req, res) => {
    res.json(req.user || req.session.user);
});

export default router;
