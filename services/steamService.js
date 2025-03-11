const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function fetchSteamUserData(steamId) {
    try {
        // Get player summary (displayName, avatar, etc.)
        const summaryResponse = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamId}`
        );
        const summaryData = await summaryResponse.json();
        const playerData = summaryData.response.players[0];

        // Get owned games
        const gamesResponse = await fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`
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
            `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend`
        );
        const data = await response.json();
        return data.friendslist.friends;
    } catch (error) {
        console.error("Error fetching friend list:", error);
        throw error;
    }
}

export { fetchFriendList, fetchGameDetails, fetchSteamUserData };
