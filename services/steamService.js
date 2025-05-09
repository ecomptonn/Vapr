import { STEAM_API_KEY } from "../config/config.js";

async function fetchOwnedGames(steamId) {
    try {
        const response = await fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        // Check if the response is OK
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Steam API error (${response.status}): ${errorText}`);
            return null;
        }

        const data = await response.json();

        // If games array is missing but response exists, create an empty array
        if (data.response && !data.response.games) {
            data.response.games = [];
        }

        // Process the games to add additional fields
        if (data.response && data.response.games) {
            data.response.games = data.response.games.map((game) => {
                return {
                    ...game,
                    playtime_forever_hours: (
                        game.playtime_forever / 60
                    ).toFixed(1),
                    playtime_2weeks_hours: game.playtime_2weeks
                        ? (game.playtime_2weeks / 60).toFixed(1)
                        : 0,
                    header_image: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
                    // Determine if last played timestamp is available
                    last_played_date: game.rtime_last_played
                        ? new Date(
                              game.rtime_last_played * 1000
                          ).toLocaleDateString()
                        : "Not available",
                };
            });
        }

        return data;
    } catch (error) {
        console.error("Error in fetchOwnedGames:", error);
        // Return a properly structured object even on error
        return { response: { games: [] } };
    }
}

async function fetchPlayerSummaries(steamIds) {
    try {
        const response = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamIds}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Steam API error (${response.status}): ${errorText}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error in fetchPlayerSummaries:", error);
        return null;
    }
}

// Get a user's friend list
async function fetchFriendList(steamId) {
    try {
        const response = await fetch(
            `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                `Friend list API error (${response.status}): ${errorText}`
            );
            return { friendslist: { friends: [] } };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in fetchFriendList:", error);
        return { friendslist: { friends: [] } };
    }
}

export { fetchFriendList, fetchOwnedGames, fetchPlayerSummaries };
