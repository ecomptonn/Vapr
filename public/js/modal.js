window.addEventListener("load", function () {
    document.getElementById("modalBackdrop").classList.add("show");
    setTimeout(() => {
        document.querySelector(".popup").style.display = "block";
    }, 1000);
});
