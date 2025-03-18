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
                                last_played_date: (() => {
                                    // Handle cases where rtime_last_played exists but might be 0
                                    if (
                                        game.rtime_last_played &&
                                        game.rtime_last_played > 0
                                    ) {
                                        const date = new Date(
                                            game.rtime_last_played * 1000
                                        );
                                        return date.toLocaleDateString();
                                    } else {
                                        return "Never";
                                    }
                                })(),
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
                    // Fetch friends with detailed profiles
                    const friendsData = await fetchFriendList(steamId);

                    console.log(
                        "Fetching friends for Steam ID:",
                        user?.steamId
                    );
                    if (!user?.steamId) {
                        console.error(
                            "Missing Steam ID, cannot fetch friend list."
                        );
                        return;
                    }

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
                                        let statusPriority = 2; // Lowest priority

                                        switch (player.personastate) {
                                            case 1:
                                                statusText = "Online";
                                                statusPriority = 0; // Highest priority
                                                break;
                                            case 2:
                                            case 3:
                                                statusText = "Away";
                                                statusPriority = 1; // Middle priority
                                                break;
                                        }

                                        return {
                                            ...player,
                                            statusText: statusText,
                                            statusPriority: statusPriority,
                                            isOnline: player.personastate === 1,
                                        };
                                    }
                                );

                            // Sort friends: online first, then away, then offline (each in alphabetical order)
                            const sortedFriends = allFriends.sort((a, b) => {
                                // First compare status priority
                                if (a.statusPriority !== b.statusPriority) {
                                    return a.statusPriority - b.statusPriority;
                                }
                                // Then sort alphabetically by name
                                return a.personaname.localeCompare(
                                    b.personaname
                                );
                            });

                            const activeFriends = allFriends
                                .filter((friend) => friend.statusPriority < 2) // Status 0 or 1 (Online or Away)
                                .sort((a, b) => {
                                    // First by status (Online before Away)
                                    if (a.statusPriority !== b.statusPriority) {
                                        return (
                                            a.statusPriority - b.statusPriority
                                        );
                                    }
                                    // Then alphabetically
                                    return a.personaname.localeCompare(
                                        b.personaname
                                    );
                                });

                            processedFriends = {
                                friendslist: {
                                    friends: sortedFriends,
                                    onlineFriends: allFriends
                                        .filter((friend) => friend.isOnline)
                                        .sort((a, b) =>
                                            a.personaname.localeCompare(
                                                b.personaname
                                            )
                                        ),
                                    activeFriends: activeFriends,
                                },
                            };
                        }
                    }

                    // Update only the friends data in the user document
                    userDoc.steamCache.steamData = {
                        ...userDoc.steamCache.steamData,
                        friends: processedFriends,
                    };
                }

                // Check if game data needs to update
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
router.get("/demo/friends/:friendName", (req, res) => {
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
router.get("/friends", ensureAuth, async (req, res) => {
    try {
        const user = req.user;

        // Get the full user document from MongoDB with cached Steam data
        const userDoc = await User.findById(user._id);

        // Convert Mongoose document to plain JavaScript object
        const userObj = userDoc.toObject();

        res.render("pages/dashboard/friends", {
            user: userObj,
            gameData: userObj.steamCache?.gameData,
            steamData: userObj.steamCache?.steamData,
        });
    } catch (error) {
        console.error("Friends route error:", error);
        res.render("errors/500");
    }
});

// @desc    Friend Detail Page
// @route   GET /friends/:steamId
router.get("/friends/:steamId", ensureAuth, async (req, res) => {
    try {
        const user = req.user;
        const steamId = req.params.steamId;

        // Get the full user document from MongoDB
        const userDoc = await User.findById(user._id);

        // Convert Mongoose document to plain JavaScript object
        const userObj = userDoc.toObject();

        // Find the specific friend by Steam ID
        const friend =
            userObj.steamCache?.steamData?.friends?.friendslist?.friends.find(
                (f) => f.steamid === steamId
            );

        if (!friend) {
            return res.status(404).render("errors/404", {
                message: "Friend not found",
            });
        }

        // Fetch this friend's games
        const friendGames = await fetchOwnedGames(steamId);

        // Process and format the friend's games data
        let formattedFriendGames = [];
        if (friendGames && friendGames.response && friendGames.response.games) {
            formattedFriendGames = friendGames.response.games.map((game) => ({
                ...game,
                name: game.name,
                appid: game.appid,
                playtime_forever_hours: (game.playtime_forever / 60).toFixed(1),
                playtime_2weeks_hours: game.playtime_2weeks
                    ? (game.playtime_2weeks / 60).toFixed(1)
                    : 0,
                header_image: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
                last_played_date: (() => {
                    // Handle cases where rtime_last_played exists but might be 0
                    if (game.rtime_last_played && game.rtime_last_played > 0) {
                        const date = new Date(game.rtime_last_played * 1000);
                        return date.toLocaleDateString();
                    } else {
                        return "Never";
                    }
                })(),
                rtime_last_played_ms: game.rtime_last_played
                    ? game.rtime_last_played * 1000
                    : null,
            }));

            // Sort by total playtime (most hours first)
            formattedFriendGames.sort(
                (a, b) => b.playtime_forever - a.playtime_forever
            );
        }

        // Create a complete friend object with all the data
        const friendWithGames = {
            ...friend,
            games: formattedFriendGames,
        };

        res.render("pages/dashboard/friend-detail", {
            user: userObj,
            friend: friendWithGames,
            title: `${friend.personaname}'s Game Stats`,
        });
    } catch (error) {
        console.error("Friend detail route error:", error);
        res.render("errors/500");
    }
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
router.get("/stats", ensureAuth, async (req, res) => {
    try {
        const user = req.user;

        // Get the full user document from MongoDB
        const userDoc = await User.findById(user._id);

        // Convert Mongoose document to plain JavaScript object
        const userObj = userDoc.toObject();

        // Create a sorted copy of the games array by playtime (most hours first)
        let sortedGames = [];
        if (userObj.steamCache?.gameData?.response?.games) {
            sortedGames = [...userObj.steamCache.gameData.response.games];
            sortedGames.sort((a, b) => {
                return b.playtime_forever - a.playtime_forever;
            });
        }

        // Render with the data from the database
        res.render("pages/dashboard/stats", {
            user: userObj,
            gameData: {
                response: {
                    games: sortedGames,
                },
            },
            steamData: userObj.steamCache?.steamData,
        });
    } catch (error) {
        console.error("Stats route error:", error);
        res.render("errors/500");
    }
});

// @desc    Privacy Page
// @route   GET /privacy
router.get("/privacy", (req, res) => {
    res.render("pages/privacy", {
        layout: "policy",
    });
});

export default router;
