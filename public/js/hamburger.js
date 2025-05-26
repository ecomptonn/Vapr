document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const sidebarWrapper = document.querySelector(".sidebar-wrapper");
    const mobileOverlay = document.querySelector(".mobile-overlay");

    if (!hamburgerMenu) {
        createHamburgerButton();
    }

    if (!mobileOverlay) {
        createMobileOverlay();
    }

    function createHamburgerButton() {
        const hamburger = document.createElement("button");
        hamburger.className = "hamburger-menu";
        hamburger.innerHTML = `
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        document.body.appendChild(hamburger);

        hamburger.addEventListener("click", toggleMobileMenu);
    }

    function createMobileOverlay() {
        const overlay = document.createElement("div");
        overlay.className = "mobile-overlay";
        document.body.appendChild(overlay);

        overlay.addEventListener("click", closeMobileMenu);
    }

    function toggleMobileMenu() {
        hamburgerMenu.classList.toggle("active");
        sidebarWrapper.classList.toggle("active");
        mobileOverlay.classList.toggle("active");

        if (sidebarWrapper.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    function closeMobileMenu() {
        hamburgerMenu.classList.remove("active");
        sidebarWrapper.classList.remove("active");
        mobileOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    const existingHamburger = document.querySelector(".hamburger-menu");
    if (existingHamburger) {
        existingHamburger.addEventListener("click", toggleMobileMenu);
    }
});
