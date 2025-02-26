// Demo user data
const demoUser = {
    id: "DEMO_ID",
    displayName: "Pepticport",
    _isDemoUser: true,
    avatar: "/images/demoAvatar.jpg",
    steamGames: [
        {
            name: "Counter-Strike 2",
            totalPlaytime: 150,
            twoWeeksPlaytime: 24,
            img: "/images/cs2Icon.jpg",
            lastPlayed: "2024-08-13T12:50:21Z",
        },
        {
            name: "Dota 2",
            totalPlaytime: 320,
            twoWeeksPlaytime: 50,
            img: "/images/dota-2-icon.png",
            lastPlayed: "2024-04-16T21:05:45Z",
        },
        {
            name: "Path of Exiles 2",
            totalPlaytime: 400,
            twoWeeksPlaytime: 15,
            img: "/images/pathOfExiles2Icon.ico",
            lastPlayed: "2025-01-10T07:55:07Z",
        },
        {
            name: "Warhammer 40,000: Dawn of War 3",
            totalPlaytime: 240,
            twoWeeksPlaytime: 10,
            img: "/images/warHammerIcon.png",
            lastPlayed: "2024-08-08T02:46:48Z",
        },
        {
            name: "Marvel Rivals",
            totalPlaytime: 830,
            twoWeeksPlaytime: 100,
            img: "/images/marvelRivalsIcon.png",
            lastPlayed: "2024-09-10T13:46:02Z",
        },
        {
            name: "Apex Legends",
            totalPlaytime: 125,
            twoWeeksPlaytime: 5,
            img: "/images/apexLegendsIcon.png",
            lastPlayed: "2024-09-14T02:09:26Z",
        },
        {
            name: "Fallout 4",
            totalPlaytime: 1800,
            twoWeeksPlaytime: 30,
            img: "/images/falloutIcon.png",
            lastPlayed: "2024-11-22T16:49:57Z",
        },
        {
            name: "The Witcher 3: Wild Hunt",
            totalPlaytime: 1200,
            twoWeeksPlaytime: 25,
            img: "/images/witcherIcon.png",
            lastPlayed: "2024-01-05T11:46:13Z",
        },
        {
            name: "Dark Souls III",
            totalPlaytime: 800,
            twoWeeksPlaytime: 15,
            img: "/images/darkSoulsIcon.png",
            lastPlayed: "2024-09-09T05:22:41Z",
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
        {
            displayName: "Pixel",
            status: "Online",
            avatar: "/images/pixelAvatar.jpg",
            currentGame: "Counter-Strike 2",
            recentGames: [
                {
                    name: "Counter-Strike 2",
                    totalPlaytime: 3000,
                    twoWeeksPlaytime: 80,
                    lastPlayed: "2025-01-18T20:15:00Z",
                },
                {
                    name: "PUBG: BATTLEGROUNDS",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-01-12T21:00:00Z",
                },
                {
                    name: "Team Fortress 2",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 10,
                    lastPlayed: "2025-01-10T18:30:00Z",
                },
                {
                    name: "Apex Legends",
                    totalPlaytime: 900,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-15T19:45:00Z",
                },
                {
                    name: "Left 4 Dead 2",
                    totalPlaytime: 600,
                    twoWeeksPlaytime: 5,
                    lastPlayed: "2025-01-08T17:20:00Z",
                },
            ],
        },
        {
            displayName: "Shadow_Walker",
            status: "Away",
            avatar: "/images/shadowAvatar.jpg",
            currentGame: "The Elder Scrolls V: Skyrim",
            recentGames: [
                {
                    name: "The Elder Scrolls V: Skyrim",
                    totalPlaytime: 2500,
                    twoWeeksPlaytime: 60,
                    lastPlayed: "2025-01-19T09:45:00Z",
                },
                {
                    name: "Fallout 4",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-01-17T15:20:00Z",
                },
                {
                    name: "The Witcher 3: Wild Hunt",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-01-16T18:30:00Z",
                },
                {
                    name: "Dark Souls III",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-01-14T22:10:00Z",
                },
                {
                    name: "Elden Ring",
                    totalPlaytime: 950,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-13T20:45:00Z",
                },
            ],
        },
        {
            displayName: "CosmoKitty",
            status: "Online",
            avatar: "/images/cosmoAvatar.jpg",
            currentGame: "Stardew Valley",
            recentGames: [
                {
                    name: "Stardew Valley",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 40,
                    lastPlayed: "2025-01-19T11:20:00Z",
                },
                {
                    name: "Terraria",
                    totalPlaytime: 2000,
                    twoWeeksPlaytime: 35,
                    lastPlayed: "2025-01-18T16:45:00Z",
                },
                {
                    name: "Minecraft Dungeons",
                    totalPlaytime: 3500,
                    twoWeeksPlaytime: 28,
                    lastPlayed: "2025-01-17T19:30:00Z",
                },
                {
                    name: "Portal 2",
                    totalPlaytime: 400,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2024-12-15T21:15:00Z",
                },
                {
                    name: "Garry's Mod",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 5,
                    lastPlayed: "2025-01-14T17:40:00Z",
                },
            ],
        },
        {
            displayName: "TechWizard",
            status: "Offline",
            avatar: "/images/wizardAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "Cyberpunk 2077",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 50,
                    lastPlayed: "2025-01-18T23:40:00Z",
                },
                {
                    name: "Half-Life: Alyx",
                    totalPlaytime: 400,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-17T20:15:00Z",
                },
                {
                    name: "Portal 2",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-01-16T21:30:00Z",
                },
                {
                    name: "Deus Ex: Mankind Divided",
                    totalPlaytime: 600,
                    twoWeeksPlaytime: 12,
                    lastPlayed: "2025-01-15T18:20:00Z",
                },
                {
                    name: "System Shock",
                    totalPlaytime: 300,
                    twoWeeksPlaytime: 8,
                    lastPlayed: "2025-01-14T22:45:00Z",
                },
            ],
        },
        {
            displayName: "SpeedRunner",
            status: "Online",
            avatar: "/images/speedAvatar.jpg",
            currentGame: "Celeste",
            recentGames: [
                {
                    name: "Celeste",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-01-19T12:15:00Z",
                },
                {
                    name: "Hollow Knight",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-01-18T19:40:00Z",
                },
                {
                    name: "Super Meat Boy",
                    totalPlaytime: 600,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-01-17T21:20:00Z",
                },
                {
                    name: "Hades",
                    totalPlaytime: 900,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-16T20:30:00Z",
                },
                {
                    name: "Dead Cells",
                    totalPlaytime: 700,
                    twoWeeksPlaytime: 18,
                    lastPlayed: "2025-01-15T22:50:00Z",
                },
            ],
        },
        {
            displayName: "StratMaster",
            status: "Online",
            avatar: "/images/stratAvatar.jpg",
            currentGame: "Age of Empires IV",
            recentGames: [
                {
                    name: "Age of Empires IV",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 45,
                    lastPlayed: "2025-01-19T13:30:00Z",
                },
                {
                    name: "Stellaris",
                    totalPlaytime: 2000,
                    twoWeeksPlaytime: 35,
                    lastPlayed: "2025-01-18T21:15:00Z",
                },
                {
                    name: "Crusader Kings III",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-01-17T22:40:00Z",
                },
                {
                    name: "Europa Universalis IV",
                    totalPlaytime: 2500,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-01-16T19:20:00Z",
                },
                {
                    name: "Hearts of Iron IV",
                    totalPlaytime: 1600,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-15T20:45:00Z",
                },
            ],
        },
        {
            displayName: "LoreMaster",
            status: "Away",
            avatar: "/images/loreAvatar.jpg",
            currentGame: "Divinity: Original Sin 2",
            recentGames: [
                {
                    name: "Divinity: Original Sin 2",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-01-19T14:20:00Z",
                },
                {
                    name: "Baldur's Gate 3",
                    totalPlaytime: 900,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-18T22:30:00Z",
                },
                {
                    name: "Pillars of Eternity",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-01-17T20:15:00Z",
                },
                {
                    name: "Path of Exile",
                    totalPlaytime: 3000,
                    twoWeeksPlaytime: 40,
                    lastPlayed: "2025-01-16T21:45:00Z",
                },
                {
                    name: "Torchlight II",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2024-12-15T19:30:00Z",
                },
            ],
        },
        {
            displayName: "CraftQueen",
            status: "Online",
            avatar: "/images/craftAvatar.jpg",
            currentGame: "Core Keeper",
            recentGames: [
                {
                    name: "Core Keeper",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 35,
                    lastPlayed: "2025-01-19T15:40:00Z",
                },
                {
                    name: "Valheim",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-01-18T23:15:00Z",
                },
                {
                    name: "Satisfactory",
                    totalPlaytime: 2000,
                    twoWeeksPlaytime: 40,
                    lastPlayed: "2025-01-17T21:30:00Z",
                },
                {
                    name: "Don't Starve Together",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-01-16T20:45:00Z",
                },
                {
                    name: "Terraria",
                    totalPlaytime: 900,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-15T22:20:00Z",
                },
            ],
        },
        {
            displayName: "RetroGamer",
            status: "Offline",
            avatar: "/images/retroAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "Final Fantasy VI",
                    totalPlaytime: 1000,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-01-18T21:40:00Z",
                },
                {
                    name: "Undertale",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-01-17T22:15:00Z",
                },
                {
                    name: "Cave Story+",
                    totalPlaytime: 400,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-01-16T20:30:00Z",
                },
                {
                    name: "Shovel Knight",
                    totalPlaytime: 600,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-01-15T19:45:00Z",
                },
                {
                    name: "Stardew Valley",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 35,
                    lastPlayed: "2025-01-14T21:20:00Z",
                },
            ],
        },
        {
            displayName: "NeonBlade",
            status: "Online",
            avatar: "/images/neonAvatar.jpg",
            currentGame: "Elden Ring",
            recentGames: [
                {
                    name: "Elden Ring",
                    totalPlaytime: 2500,
                    twoWeeksPlaytime: 95,
                    lastPlayed: "2025-02-26T19:45:00Z",
                },
                {
                    name: "Cyberpunk 2077",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-02-20T22:10:00Z",
                },
                {
                    name: "Dark Souls III",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-15T20:30:00Z",
                },
                {
                    name: "The Witcher 3",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 12,
                    lastPlayed: "2025-02-18T21:15:00Z",
                },
                {
                    name: "Bloodborne",
                    totalPlaytime: 950,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-05T18:40:00Z",
                },
            ],
        },
        {
            displayName: "ShadowHunter",
            status: "Away",
            avatar: "/images/shadowHunterAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "Rainbow Six Siege",
                    totalPlaytime: 3200,
                    twoWeeksPlaytime: 50,
                    lastPlayed: "2025-02-24T21:30:00Z",
                },
                {
                    name: "Valorant",
                    totalPlaytime: 2800,
                    twoWeeksPlaytime: 65,
                    lastPlayed: "2025-02-25T23:00:00Z",
                },
                {
                    name: "Call of Duty: Modern Warfare III",
                    totalPlaytime: 1100,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-02-22T20:15:00Z",
                },
                {
                    name: "Overwatch 2",
                    totalPlaytime: 1700,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-02-19T22:45:00Z",
                },
                {
                    name: "Destiny 2",
                    totalPlaytime: 2500,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-28T19:20:00Z",
                },
            ],
        },
        {
            displayName: "StarGazer",
            status: "Offline",
            avatar: "/images/starAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "No Man's Sky",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-02-20T18:10:00Z",
                },
                {
                    name: "Starfield",
                    totalPlaytime: 2200,
                    twoWeeksPlaytime: 45,
                    lastPlayed: "2025-02-21T21:30:00Z",
                },
                {
                    name: "Mass Effect Legendary Edition",
                    totalPlaytime: 950,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-10T20:45:00Z",
                },
                {
                    name: "Elite Dangerous",
                    totalPlaytime: 1400,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-02-18T19:20:00Z",
                },
                {
                    name: "Star Citizen",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 10,
                    lastPlayed: "2025-02-15T22:00:00Z",
                },
            ],
        },
        {
            displayName: "CyberWitch",
            status: "Online",
            avatar: "/images/witchAvatar.jpg",
            currentGame: "Baldur's Gate 3",
            recentGames: [
                {
                    name: "Baldur's Gate 3",
                    totalPlaytime: 2100,
                    twoWeeksPlaytime: 85,
                    lastPlayed: "2025-02-26T20:15:00Z",
                },
                {
                    name: "Divinity: Original Sin 2",
                    totalPlaytime: 1600,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-05T21:30:00Z",
                },
                {
                    name: "Dragon Age: Inquisition",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2024-12-20T19:45:00Z",
                },
                {
                    name: "Pillars of Eternity II",
                    totalPlaytime: 950,
                    twoWeeksPlaytime: 10,
                    lastPlayed: "2025-02-15T18:30:00Z",
                },
                {
                    name: "Pathfinder: Wrath of the Righteous",
                    totalPlaytime: 1100,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-02-23T22:10:00Z",
                },
            ],
        },
        {
            displayName: "RogueDrifter",
            status: "Online",
            avatar: "/images/rogueAvatar.jpg",
            currentGame: "Forza Horizon 5",
            recentGames: [
                {
                    name: "Forza Horizon 5",
                    totalPlaytime: 1700,
                    twoWeeksPlaytime: 60,
                    lastPlayed: "2025-02-26T21:00:00Z",
                },
                {
                    name: "Gran Turismo 7",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-02-24T19:15:00Z",
                },
                {
                    name: "Need for Speed Heat",
                    totalPlaytime: 850,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-02-22T20:30:00Z",
                },
                {
                    name: "F1 24",
                    totalPlaytime: 950,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-02-23T18:45:00Z",
                },
                {
                    name: "Assetto Corsa Competizione",
                    totalPlaytime: 700,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-25T21:20:00Z",
                },
            ],
        },
        {
            displayName: "TechMage",
            status: "Online",
            avatar: "/images/techMageAvatar.jpg",
            currentGame: "Minecraft",
            recentGames: [
                {
                    name: "Minecraft",
                    totalPlaytime: 4500,
                    twoWeeksPlaytime: 40,
                    lastPlayed: "2025-02-26T20:30:00Z",
                },
                {
                    name: "Factorio",
                    totalPlaytime: 2200,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-02-24T22:15:00Z",
                },
                {
                    name: "Satisfactory",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-02-22T19:40:00Z",
                },
                {
                    name: "Terraria",
                    totalPlaytime: 1300,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-15T21:10:00Z",
                },
                {
                    name: "RimWorld",
                    totalPlaytime: 2500,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-02-25T23:05:00Z",
                },
            ],
        },
        {
            displayName: "StealthFox",
            status: "Online",
            avatar: "/images/foxAvatar.jpg",
            currentGame: "Dishonored 2",
            recentGames: [
                {
                    name: "Dishonored 2",
                    totalPlaytime: 950,
                    twoWeeksPlaytime: 45,
                    lastPlayed: "2025-02-26T19:15:00Z",
                },
                {
                    name: "Metal Gear Solid V",
                    totalPlaytime: 1400,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-02-23T21:30:00Z",
                },
                {
                    name: "Hitman 3",
                    totalPlaytime: 1100,
                    twoWeeksPlaytime: 35,
                    lastPlayed: "2025-02-25T20:50:00Z",
                },
                {
                    name: "Deus Ex: Mankind Divided",
                    totalPlaytime: 850,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-20T18:40:00Z",
                },
                {
                    name: "Splinter Cell: Blacklist",
                    totalPlaytime: 750,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-05T22:20:00Z",
                },
            ],
        },
        {
            displayName: "BeatMaster",
            status: "Away",
            avatar: "/images/beatAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "Beat Saber",
                    totalPlaytime: 2000,
                    twoWeeksPlaytime: 70,
                    lastPlayed: "2025-02-25T21:00:00Z",
                },
                {
                    name: "Thumper",
                    totalPlaytime: 550,
                    twoWeeksPlaytime: 10,
                    lastPlayed: "2025-02-20T19:45:00Z",
                },
                {
                    name: "Pistol Whip",
                    totalPlaytime: 800,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-02-23T22:30:00Z",
                },
                {
                    name: "Guitar Hero Live",
                    totalPlaytime: 1200,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-10T20:15:00Z",
                },
                {
                    name: "Audiosurf 2",
                    totalPlaytime: 650,
                    twoWeeksPlaytime: 15,
                    lastPlayed: "2025-02-21T18:50:00Z",
                },
            ],
        },
        {
            displayName: "TacticalBrain",
            status: "Online",
            avatar: "/images/tacticalAvatar.jpg",
            currentGame: "Total War: Warhammer III",
            recentGames: [
                {
                    name: "Total War: Warhammer III",
                    totalPlaytime: 1900,
                    twoWeeksPlaytime: 55,
                    lastPlayed: "2025-02-26T22:10:00Z",
                },
                {
                    name: "Civilization VI",
                    totalPlaytime: 3200,
                    twoWeeksPlaytime: 20,
                    lastPlayed: "2025-02-22T21:40:00Z",
                },
                {
                    name: "XCOM 2",
                    totalPlaytime: 1500,
                    twoWeeksPlaytime: 30,
                    lastPlayed: "2025-02-24T20:20:00Z",
                },
                {
                    name: "Crusader Kings III",
                    totalPlaytime: 2600,
                    twoWeeksPlaytime: 40,
                    lastPlayed: "2025-02-25T19:30:00Z",
                },
                {
                    name: "Age of Empires IV",
                    totalPlaytime: 1700,
                    twoWeeksPlaytime: 25,
                    lastPlayed: "2025-02-23T23:00:00Z",
                },
            ],
        },
        {
            displayName: "LootGoblin",
            status: "Offline",
            avatar: "/images/goblinAvatar.jpg",
            currentGame: null,
            recentGames: [
                {
                    name: "Diablo IV",
                    totalPlaytime: 2800,
                    twoWeeksPlaytime: 90,
                    lastPlayed: "2025-02-25T23:45:00Z",
                },
                {
                    name: "Path of Exile",
                    totalPlaytime: 3500,
                    twoWeeksPlaytime: 45,
                    lastPlayed: "2025-02-24T22:30:00Z",
                },
                {
                    name: "Borderlands 3",
                    totalPlaytime: 1600,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-15T21:20:00Z",
                },
                {
                    name: "Destiny 2",
                    totalPlaytime: 2900,
                    twoWeeksPlaytime: 35,
                    lastPlayed: "2025-02-23T20:15:00Z",
                },
                {
                    name: "Monster Hunter: World",
                    totalPlaytime: 1800,
                    twoWeeksPlaytime: 0,
                    lastPlayed: "2025-01-28T19:50:00Z",
                },
            ],
        },
    ],
};

export default demoUser;
