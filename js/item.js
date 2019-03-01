window.addEventListener("DOMContentLoaded", function () {
    let data = window.catalog;
    let bagItem = document.getElementsByClassName("item")[0];
    // Создание товара

    function createItem(data) {
        let item = document.querySelector(".item");
        item.innerHTML = `<div class="item-preview">
                         <img class="item-preview-big" src="${data.thumbnail}" alt="${data.title}">
                         <ul class="item-preview-list">
                         <li class="item-preview-small-wrap active"><img class="item-preview-small" src="${data.preview[0]}"alt="${data.title}"></li>
                         <li class="item-preview-small-wrap"><img class="item-preview-small" src="${data.preview[1]}"alt="${data.title}"></li>                   
                         <li class="item-preview-small-wrap"><img class="item-preview-small" src="${data.preview[2]}"alt="${data.title}"></li>
                         </ul>
                         </div>
                         <div class="item-details">
                         <h2 class="item-title">${data.title}</h2>
                         <p class="item-desc">${data.description}</p>
                         ${data.discountedPrice === null && data.price === null ? "" : data.discountedPrice === data.price ? '<span class="item-price">'+ data.price +'</span>' : '<span class="item-price">'+ data.discountedPrice + '</span>'}
                         <ul class="item-sizes">Size:
                         ${data.sizes.map(size => `<li class="item-size">${size}</li>`).join(" ")}
                         </ul>
                         <ul class="item-colors">Color:
                         ${data.colors.map(color => `<li class="item-color">${color}</li>`).join(" ")}
                         </ul>
                         <button class="toBagBtn">Add to bag</button>
                         </div>`;
        return item;
    };

    // Вывод товара id которого хранится в localStorage
    for (let i = 0; i < data.length; i++) {
        if (localStorage.getItem("itemId") === data[i].id) {
            createItem(data[i]);
        }
    }

    let itemPreview = document.getElementsByClassName("item-preview")[0];
    let itemSizes = document.getElementsByClassName("item-sizes")[0];
    let itemColors = document.getElementsByClassName("item-colors")[0];

    // Thumbnails
    itemPreview.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("item-preview-small")) return;
        let imgBig = document.getElementsByClassName("item-preview-big")[0];
        let imgSmallSrc = target.src;
        imgBig.src = imgSmallSrc;
        let imgWraps = itemPreview.getElementsByClassName("item-preview-small-wrap");
        for (let i = 0; i < imgWraps.length; i++) {
            imgWraps[i].classList.remove("active");
        }
        target.parentElement.classList.add("active");
    });

    // Выбор размера
    itemSizes.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("item-size")) return;
        let sizes = itemSizes.getElementsByClassName("item-size");
        for (let i = 0; i < sizes.length; i++) {
            sizes[i].classList.remove("active");
        }
        target.classList.add("active");
    });

    // Выбор цвета
    itemColors.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("item-color")) return;
        let colors = itemColors.getElementsByClassName("item-color");
        for (let i = 0; i < colors.length; i++) {
            colors[i].classList.remove("active");
        }
        target.classList.add("active");
    });

    // Добавление выбраного товара в LocalStorage
    bagItem.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("toBagBtn")) return;
        let title = this.getElementsByClassName("item-title")[0].innerHTML;
        let price = this.getElementsByClassName("item-price")[0].innerHTML;
        let imgSrc = this.getElementsByClassName("item-preview-big")[0].src;
        let size = this.getElementsByClassName("item-sizes")[0].getElementsByClassName("active")[0] ? this.getElementsByClassName("item-sizes")[0].getElementsByClassName("active")[0].innerHTML : "";
        let color = this.getElementsByClassName("item-colors")[0].getElementsByClassName("active")[0] ? this.getElementsByClassName("item-colors")[0].getElementsByClassName("active")[0].innerHTML : "";
        let shopingItemsArray = JSON.parse(localStorage.getItem("shopingItems")) || [];
        let shopingItems = {
            title: title,
            price: +price,
            imgSrc: imgSrc,
            size: size,
            color: color,
            quantity: 1
        };
        let index = 0;
        let keys = shopingItemsArray.length ? Object.keys(shopingItemsArray[0]).length : 0;
        for (let i = 0; i < shopingItemsArray.length; i++) {
            let item = shopingItemsArray[i];
            let check = 0;
            for (let key in item) {
                if (key === "quantity") continue;
                if (shopingItems[key] === item[key]) {
                    check++;
                    index = i;
                }
                if (check === keys - 1) {
                    shopingItemsArray[index].quantity++;
                    localStorage.setItem("shopingItems", JSON.stringify(shopingItemsArray));
                    setQuantity(shopingItemsArray);
                    setTotalPrice(shopingItemsArray);
                    return;
                }
            }
        }
        shopingItemsArray.push(shopingItems);
        localStorage.setItem("shopingItems", JSON.stringify(shopingItemsArray));
        setQuantity(shopingItemsArray);
        setTotalPrice(shopingItemsArray);
    });
});