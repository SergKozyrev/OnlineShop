let items = document.getElementsByClassName("bag-items-wrap")[0];
let buyNow = document.getElementsByClassName("buy-now")[0];
let shopingItemsArray = JSON.parse(localStorage.getItem("shopingItems")) || [];

function setPriceBag(data) {
    let totalPrice = 0;
    let price = document.getElementsByClassName("total-cost-price")[0];
    for (let i = 0; i < data.length; i++) {
        totalPrice += data[i].price * data[i].quantity;
    }
    price.innerHTML = totalPrice;
};
setPriceBag(shopingItemsArray);

function createItem(data) {
    let item = document.createElement("div");
    item.className = "bag-item";
    item.innerHTML = `  <div class="bag-item-img">
                            <div class="bag-item-img-overlay">
                                <span>View item</span>
                            </div>
                            <img src="${data.imgSrc}" alt="${data.title}">
                        </div>
                        <div class="bag-item-details">
                            <h4 class="bag-item-title">Only Skinny Jeans</h4>
                                <span class="bag-item-price">${data.price}</span>
                                <span class="bag-item-color">Color: ${data.color}</span>
                                <span class="bag-item-size">Size: ${data.size}</span>
                                <span class="bag-item-quantity">Quantity:
                                <img class="minus" src="images/minus.png" alt="Quantyti Minus">
                                <span class="current-quantity">${data.quantity}</span>
                                <img class="plus" src="images/plus.png" alt="Quantyti Plus"></span>
                            <button class="remove-item">Remove item</button>
                        </div>`;
    return item;
}

if (shopingItemsArray.length === 0) {
    items.innerHTML = `<div class=message>
                            <span>Your shopping bag is empty. Use Catalog to add new items</span>
                        </div>`;
} else {
    for (let i = 0; i < shopingItemsArray.length; i++) {
        items.append(createItem(shopingItemsArray[i]));
    }
}
items.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("minus") || target.classList.contains("plus")) {
        let quantity = target.parentElement;
        let currentQuantity = quantity.getElementsByClassName("current-quantity")[0];
        let item = quantity.parentElement.parentElement;
        let index = [...item.parentNode.children].indexOf(item);
        if (target.className === "minus" && currentQuantity.innerHTML !== "1") {
            currentQuantity.innerHTML--;
            shopingItemsArray[index].quantity--;
        } else if (target.className === "plus") {
            currentQuantity.innerHTML++;
            shopingItemsArray[index].quantity++;
        }
        localStorage.setItem("shopingItems", JSON.stringify(shopingItemsArray));
        setQuantity(shopingItemsArray);
        setTotalPrice(shopingItemsArray);
        setPriceBag(shopingItemsArray);
    }
    if (target.classList.contains("remove-item")) {
        let item = target.parentElement.parentElement;
        let index = [...item.parentNode.children].indexOf(item);
        this.removeChild(item);
        shopingItemsArray.splice(index, 1);
        localStorage.setItem("shopingItems", JSON.stringify(shopingItemsArray));
        setQuantity(shopingItemsArray);
        setTotalPrice(shopingItemsArray);
        setPriceBag(shopingItemsArray);
        if (shopingItemsArray.length === 0) {
            items.innerHTML = `<div class=message>
                                 <span>Your shopping bag is empty. Use Catalog to add new items</span>
                               </div>`;
        }
    }
});

buyNow.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("buy-now-btn")) {
        items.innerHTML = `<div class=message>
                            <span>Thank you for your purchase.</span>
                        </div>`;
        shopingItemsArray = [];
        localStorage.setItem("shopingItems", JSON.stringify(shopingItemsArray));
        setPriceBag(shopingItemsArray);
        setQuantity(shopingItemsArray);
        setTotalPrice(shopingItemsArray);
    }
    if (target.classList.contains("empty-bag")) {
        items.innerHTML = `<div class=message>
                            <span>Your shopping bag is empty. Use Catalog to add new items</span>
                        </div>`;
        shopingItemsArray = [];
        localStorage.setItem("shopingItems", JSON.stringify(shopingItemsArray));
        setPriceBag(shopingItemsArray);
        setQuantity(shopingItemsArray);
        setTotalPrice(shopingItemsArray);
    }

});