window.addEventListener("DOMContentLoaded", function () {
    let data = window.catalog;

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
                         <span class="item-price">${data.price}</span>
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
        console.log(imgSmallSrc);
    });

    itemSizes.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("item-size")) return;
        let sizes = itemSizes.getElementsByClassName("item-size");
        for (let i = 0; i < sizes.length; i++) {
            sizes[i].classList.remove("active");
        }
        target.classList.add("active");
    });

    itemColors.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("item-color")) return;
        let colors = itemColors.getElementsByClassName("item-color");
        for (let i = 0; i < colors.length; i++) {
            colors[i].classList.remove("active");
        }
        target.classList.add("active");
    });

});