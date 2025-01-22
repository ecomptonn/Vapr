document
    .querySelectorAll(".carousel-container__nav-button")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.dataset.direction;
            const carouselId = button.dataset.carousel;
            const container = document.getElementById(`${carouselId}-carousel`);

            // Calculate the visible width of the container
            const containerWidth = container.clientWidth - 80; // Subtract padding

            // Calculate how many cards can fit
            const cardWidth = direction === "games" ? 300 : 240; // Game or friend card width
            const gap = 16;
            const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));

            // Calculate scroll amount (width of visible cards + gap)
            const scrollAmount =
                direction === "prev"
                    ? -(cardsPerView * (cardWidth + gap))
                    : cardsPerView * (cardWidth + gap);

            container.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        });
    });
