const demoUser = {
    id: "DEMO_ID",
    displayName: "Peptic",
    _isDemoUser: true,
    avatarUrl: "/images/demoAvatar.jpg",
    steamGames: [
        {
            name: "Counter-Strike 2",
            totalPlaytime: 150,
            twoWeeksPlaytime: 24,
            img: "/images/cs2Icon.jpg",
        },
        {
            name: "Dota 2",
            totalPlaytime: 320,
            twoWeeksPlaytime: 50,
            img: "/images/dota-2-icon.png",
        },
        {
            name: "Path of Exiles 2",
            totalPlaytime: 400,
            twoWeeksPlaytime: 15,
            img: "/images/pathOfExiles2Icon.ico",
        },
        {
            name: "Warhammer 40,000: Dawn of War 3",
            totalPlaytime: 240,
            twoWeeksPlaytime: 10,
            img: "/images/warHammerIcon.png",
        },
        {
            name: "Marvel Rivals",
            totalPlaytime: 830,
            twoWeeksPlaytime: 100,
            img: "/images/marvelRivalsIcon.png",
        },
        {
            name: "Apex Legends",
            totalPlaytime: 125,
            twoWeeksPlaytime: 5,
            img: "apexLegendsIcon.png",
        },
    ],
    friends: [
        {
            displayName: "shalissa",
            status: "Online",
            avatar: "/images/shalissaAvatar.jpg",
            currentGame: "Marvel Rivals",
            recentGames: [
                {
                    name: "Apex Legends",
                    totalplaytime: 200,
                    twoWeeksPlaytime: 42,
                    lastPlayed: "2024-01-12T15:30:00Z",
                },
                {
                    name: "Team Fortress 2",
                    totalplaytime: 1200,
                    twoWeeksPlaytime: 102,
                    lastPlayed: "2025-01-08T14:20:00Z",
                },
                {
                    name: "Sid Meier's Civilization VI",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 26,
                    lastPlayed: "2025-01-07T22:15:00Z",
                },
                {
                    name: "Left 4 Dead 2",
                    totalplaytime: 700,
                    twoWeeksPlaytime: 100,
                    lastPlayed: "2025-01-06T12:00:00Z",
                },
                {
                    name: "ARK: Survival Evolved",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 150,
                    lastPlayed: "2024-12-28T11:30:00Z",
                },
            ],
        },
        {
            displayName: "Nova",
            status: "Offline",
            avatar: "/images/novaAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "Left 4 Dead 2",
                    playtime: 700,
                    lastPlayed: "2025-01-06T12:00:00Z",
                },
                {
                    name: "Dota 2",
                    playtime: 2500,
                    lastPlayed: "2025-01-09T18:45:00Z",
                },
                {
                    name: "Garry's Mod",
                    playtime: 900,
                    lastPlayed: "2025-01-05T19:30:00Z",
                },
                {
                    name: "Terraria",
                    playtime: 1100,
                    lastPlayed: "2025-01-02T14:45:00Z",
                },
                {
                    name: "Factorio",
                    playtime: 600,
                    lastPlayed: "2024-12-31T23:50:00Z",
                },
            ],
        },
    ],
};

export default demoUser;
