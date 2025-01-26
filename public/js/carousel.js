function handleCarouselScroll(carouselId, direction) {
    const container = document.getElementById(`${carouselId}-carousel`);
    if (!container) return;

    const cards = container.querySelectorAll(".game-card, .friend-card");
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 16;
    const visibleWidth = container.offsetWidth - 40;
    const maxScroll = container.scrollWidth - visibleWidth;
    let scrollAmount;

    if (direction === "prev") {
        scrollAmount = Math.max(0, container.scrollLeft - visibleWidth);
    } else {
        scrollAmount = Math.min(maxScroll, container.scrollLeft + visibleWidth);
    }

    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
}

// Add event listeners
document
    .querySelectorAll(".carousel-container__nav-button")
    .forEach((button) => {
        button.addEventListener("click", (e) => {
            const carouselId = e.currentTarget.dataset.carousel;
            const direction = e.currentTarget.dataset.direction;
            handleCarouselScroll(carouselId, direction);
        });
    });
