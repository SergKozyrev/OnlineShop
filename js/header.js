function setQuantity(data) {
    let quantity = 0;
    let amount = document.getElementsByClassName("amount")[0];
    for (let i = 0; i < data.length; i++) {
        quantity += data[i].quantity;
    }
    amount.innerHTML = quantity
};

function setTotalPrice(data) {
    let totalPrice = 0;
    let price = document.getElementsByClassName("total-price")[0];
    for (let i = 0; i < data.length; i++) {
        totalPrice += data[i].price * data[i].quantity;
    }
    price.innerHTML = totalPrice;
};
document.addEventListener("DOMContentLoaded", function () {
    let toggleBtn = document.getElementsByClassName("toggle-menu")[0];
    let menu = document.getElementsByClassName("header-nav")[0];
    let price = document.getElementsByClassName("total-price")[0];
    let shopingItemsArray = JSON.parse(localStorage.getItem("shopingItems"));
    if (shopingItemsArray === null) shopingItemsArray = [];
    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("is-opened");
        menu.classList.toggle("is-opened");
    })
    if (shopingItemsArray.length === 0) {
        price.innerHTML = "";
    } else {
        setTotalPrice(shopingItemsArray);
    }
    setQuantity(shopingItemsArray);
});