document.addEventListener("DOMContentLoaded", () => {
    const carousels = {
        games: {
            element: document.getElementById("games-carousel"),
            position: 0,
        },
        friends: {
            element: document.getElementById("friends-carousel"),
            position: 0,
        },
    };

    const cardWidth = 300; // Width of each card + gap
    const visibleCards = 4; // Number of cards visible at once

    document
        .querySelectorAll(".carousel-container__nav-button")
        .forEach((button) => {
            button.addEventListener("click", () => {
                const carouselId = button.dataset.carousel;
                const direction = button.dataset.direction;
                const carousel = carousels[carouselId];

                if (direction === "next") {
                    carousel.position = Math.max(
                        -(carousel.element.children.length - visibleCards) *
                            cardWidth,
                        carousel.position - cardWidth
                    );
                } else {
                    carousel.position = Math.min(
                        0,
                        carousel.position + cardWidth
                    );
                }

                carousel.element.style.transform = `translateX(${carousel.position}px)`;
                carousel.element.style.transition =
                    "transform 0.3s ease-in-out";
            });
        });
});
