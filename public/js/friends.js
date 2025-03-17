document.addEventListener("DOMContentLoaded", () => {
    // Get user type from data attribute
    const isDemoUser = document.body.dataset.userType === "demo";

    const friendElements = document.querySelectorAll(".friend-card");

    friendElements.forEach((friend) => {
        friend.addEventListener("click", () => {
            const friendNameElement = friend.querySelector(".friend-name");
            const friendName = friendNameElement
                ? friendNameElement.textContent.trim()
                : null;

            if (friendName) {
                // Route based on user type
                if (isDemoUser) {
                    window.location.href = `/demo/friends/${encodeURIComponent(
                        friendName
                    )}`;
                } else {
                    window.location.href = `/friends/${encodeURIComponent(
                        friendName
                    )}`;
                }
            } else {
                console.error("Could not find friend name!");
            }
        });
    });
});
