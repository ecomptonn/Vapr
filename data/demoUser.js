const demoUser = {
    id: "DEMO_ID",
    displayName: "Demo User",
    _isDemoUser: true,
    photos: [
        {
            value: "https://avatars.steamstatic.com/50767cea96889a121066ed45c098873cb258f8f3_full.jpg",
        },
    ],
    steamGames: [
        {
            name: "Counter-Strike 2",
            playtime: 150,
            img: "/images/cs2Icon.jpg",
        },
        {
            name: "Dota 2",
            playTime: 320,
            img: "/images/dota-2-icon.png",
        },
    ],
    friends: [
        {
            displayName: "shalissa",
            status: "Online",
            avatar: "/images/shalissaAvatar.jpg",
        },
        {
            displayName: "Nova",
            status: "In-Game",
            avatar: "/images/novaAvatar.jpg",
        },
    ],
};

export default demoUser;
