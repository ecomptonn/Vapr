import { STEAM_API_KEY } from "../config/config.js";

async function fetchSteamUserData(steamId) {
    try {
        // Get player summary (displayName, avatar, etc.)
        const summaryResponse = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`
        );
        const summaryData = await summaryResponse.json();
        const playerData = summaryData.response.players[0];

        // Get owned games
        const gamesResponse = await fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}`
        );
        const gamesData = await gamesResponse.json();
        const games = gamesData.response.games || [];

        return {
            steamId,
            username: playerData.personaname,
            avatar: playerData.avatarfull,
            games,
            lastUpdated: new Date(),
        };
    } catch (error) {
        console.error("Error fetching Steam data:", error);
        throw error;
    }
}

// Get details for a specific game by appId
async function fetchGameDetails(appId) {
    try {
        const response = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appId}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
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
            `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        return data.friendslist.friends;
    } catch (error) {
        console.error("Error fetching friend list:", error);
        throw error;
    }
}

// fetch users recently played games
async function fetchRecentlyPlayedGames(steamId, count = 5) {
    try {
        const response = await fetch(
            `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
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
    fetchSteamUserData,
    fetchRecentlyPlayedGames,
};
