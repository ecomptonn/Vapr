const demoUser = {
    id: "DEMO_ID",
    displayName: "Demo User",
    photos: [
        {
            value: "/images/demo-avatar.png",
        },
    ],
    _isDemoUser: true,
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

export default "demoUser";
