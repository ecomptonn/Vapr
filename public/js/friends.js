document.addEventListener("DOMContentLoaded", () => {
    const friendElements = document.querySelectorAll(".friend-item");

    friendElements.forEach((friend) => {
        friend.addEventListener("click", () => {
            const friendName = friend.dataset.friendName;
            window.location.href = `/friend/${encodeURIComponent(friendName)}`;
        });
    });
});
