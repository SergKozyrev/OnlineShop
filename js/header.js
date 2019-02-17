document.addEventListener("DOMContentLoaded", function () {
    let toggleBtn = document.getElementsByClassName("toggle-menu")[0];
    let menu = document.getElementsByClassName("header-nav")[0];

    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("is-opened");
        menu.classList.toggle("is-opened");
    })
});