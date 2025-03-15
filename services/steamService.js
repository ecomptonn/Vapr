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

        // Log the structure of the returned data
        console.log(
            "Steam API response structure:",
            JSON.stringify({
                has_response: !!data.response,
                has_games: !!(data.response && data.response.games),
                game_count:
                    data.response && data.response.games
                        ? data.response.games.length
                        : 0,
            })
        );

        // If games array is missing but response exists, create an empty array
        if (data.response && !data.response.games) {
            data.response.games = [];
        }

        return data;
    } catch (error) {
        console.error("Error in fetchOwnedGames:", error);
        // Return a properly structured object even on error
        return { response: { games: [] } };
    }
}

// Get details for a specific game by appId
async function fetchGameDetails(appId) {
    try {
        const response = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appId}`
        );
        const data = await response.json();

        return data[appId].data;
    } catch (error) {
        console.error(`Error fetching game details for ${appId}:`, error);
        throw error;
    }
}

// Get a user's friend list
async function fetchFriendList(steamId) {
    try {
        const response = await fetch(
            `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend`
        );
        const data = await response.json();
        return data.friendslist.friends;
    } catch (error) {
        console.error("Error fetching friend list:", error);
        throw error;
    }
}

// fetch users recently played games
async function fetchRecentlyPlayedGames(steamId) {
    try {
        const response = await fetch(
            `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}`
        );
        const data = await response.json();

        if (!data.response || !data.response.games) {
            return [];
        }

        return data.response.games.map((game) => ({
            appId: game.appid,
            name: game.name,
            iconUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
            logoUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`,
            playtimeForever: game.playtime_forever, // in minutes
            playtimeRecent: game.playtime_2weeks || 0, // in minutes
        }));
    } catch (error) {
        console.error("Error fetching recently played games:", error);
        throw error;
    }
}

export {
    fetchFriendList,
    fetchGameDetails,
    fetchOwnedGames,
    fetchRecentlyPlayedGames,
};
