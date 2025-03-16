import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import demoUser from "../data/demoUser.js";
import User from "../models/User.js";
const router = express.Router();

// Import steam service
import {
    fetchFriendList,
    fetchOwnedGames,
    fetchPlayerSummaries,
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

        // Check if game data needs update (once per 24 hours)
        const gameDataNeedsUpdate =
            !userDoc.steamCache?.gameData ||
            !userDoc.steamCache?.timestamp ||
            Date.now() - new Date(userDoc.steamCache.timestamp).getTime() >
                24 * 60 * 60 * 1000;

        // Always update friends on login, but only update games data if needed
        const freshLogin = req.session.freshLogin || false;

        if (gameDataNeedsUpdate || freshLogin) {
            try {
                let gameData = userDoc.steamCache?.gameData;
                let recentGames =
                    userDoc.steamCache?.steamData?.recentGames?.response
                        ?.games || [];

                if (gameDataNeedsUpdate) {
                    // Fetch and process game data
                    gameData = await fetchOwnedGames(steamId);

                    if (
                        gameData &&
                        gameData.response &&
                        gameData.response.games
                    ) {
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

                        formattedGames.sort((a, b) => {
                            return (
                                (b.rtime_last_played || 0) -
                                (a.rtime_last_played || 0)
                            );
                        });

                        gameData.response.games = formattedGames;

                        recentGames = formattedGames
                            .filter((game) => game.rtime_last_played)
                            .slice(0, 8); // show only 8 games (for dashboard home)
                    }
                }

                // Always fetch fresh friends data on login
                if (freshLogin) {
                    console.log(
                        "Fresh login detected - updating friends status"
                    );

                    // Fetch friends with detailed profiles
                    const friendsData = await fetchFriendList(steamId);

                    // Process friend data
                    let processedFriends = { friendslist: { friends: [] } };
                    if (
                        friendsData &&
                        friendsData.friendslist &&
                        friendsData.friendslist.friends
                    ) {
                        const friendIds = friendsData.friendslist.friends
                            .map((friend) => friend.steamid)
                            .join(",");
                        const friendProfiles = await fetchPlayerSummaries(
                            friendIds
                        );

                        if (
                            friendProfiles &&
                            friendProfiles.response &&
                            friendProfiles.response.players
                        ) {
                            // Process all friends
                            const allFriends =
                                friendProfiles.response.players.map(
                                    (player) => {
                                        // Convert personastate to a status string
                                        let statusText = "Offline";
                                        switch (player.personastate) {
                                            case 1:
                                                statusText = "Online";
                                                break;
                                            case 2:
                                                statusText = "Away";
                                                break;
                                        }

                                        return {
                                            ...player,
                                            statusText: statusText,
                                        };
                                    }
                                );

                            // Filter for online friends and sort alphabetically
                            const onlineFriends = allFriends
                                .filter((friend) => friend.personastate === 1)
                                .sort((a, b) =>
                                    a.personaname.localeCompare(b.personaname)
                                );

                            processedFriends = {
                                friendslist: {
                                    friends: allFriends,
                                    onlineFriends: onlineFriends, // online friends, abc order
                                },
                                lastUpdated: new Date(),
                            };
                        }
                    }

                    // Update only the friends data in the user document
                    userDoc.steamCache.steamData = {
                        ...userDoc.steamCache.steamData,
                        friends: processedFriends,
                    };
                }

                // If game data was updated, update that too
                if (gameDataNeedsUpdate) {
                    userDoc.steamCache.gameData = gameData;
                    userDoc.steamCache.steamData.recentGames = {
                        response: {
                            games: recentGames,
                        },
                    };
                    userDoc.steamCache.timestamp = new Date();
                }

                // Save the updated document
                await userDoc.save();

                // Clear the fresh login flag
                if (req.session) {
                    req.session.freshLogin = false;
                }
            } catch (error) {
                console.error("Error fetching/processing Steam data:", error);
            }
        }

        // Convert Mongoose document to plain js object
        const userObj = userDoc.toObject();

        // Render with the data from the database
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

export default router;
