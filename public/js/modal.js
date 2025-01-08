document.addEventListener("DOMContentLoaded", function () {
    const backdrop = document.getElementById("modalBackdrop");
    const modal = document.getElementById("modal");

    backdrop.style.display = "block";

    setTimeout(() => {
        backdrop.classList.add("show");
        modal.classList.add("show");
    }, 50);
});

window.addEventListener("load", function () {
    setTimeout(() => {
        document.querySelector(".popup").style.display = "block";
    }, 1000);
});
