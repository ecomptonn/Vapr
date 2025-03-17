document.addEventListener("DOMContentLoaded", () => {
    // Get user type from data attribute
    const isDemoUser = document.body.dataset.userType === "demo";

    const friendElements = document.querySelectorAll(".friend-card");

    friendElements.forEach((friend) => {
        friend.addEventListener("click", () => {
            const steamId = friend.dataset.steamid;
            const friendName = friend.dataset.friendName;

            if (isDemoUser) {
                if (friendName) {
                    window.location.href = `/demo/friends/${encodeURIComponent(
                        friendName
                    )}`;
                } else {
                    console.error("Demo user: Missing friendName!");
                }
            } else {
                if (steamId) {
                    window.location.href = `/friends/${steamId}`;
                } else {
                    console.error("Could not find steamId!");
                }
            }
        });
    });
});
