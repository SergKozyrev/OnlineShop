$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        infinite: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }]
    });
});

window.addEventListener("DOMContentLoaded", function () {
    let data = window.catalog;
    let catalog = document.querySelector(".arrivals-wrapp");

    function sortByDate(a, b) {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    data.sort(sortByDate);
    // Создание карточки
    function createItem(data) {
        let item = document.createElement("div");
        item.className = "card";
        item.setAttribute("data-id", data.id);
        item.innerHTML = `<div class="card-img">
                          <div class="card-img-overlay">
                          <span>View item</span>
                          </div>
                          <img src="${data.thumbnail}" alt="Only Skinny Jeans">
                          </div>
                          <h4 class="card-title">${data.title}</h4>
                          ${data.discountedPrice === null && data.price === null ? '<p class="card-placeholder">'+data.placeholder+'</p>' : data.discountedPrice === data.price ? '<span class="card-price">'+ data.price +'</span>' : '<span class="card-discount-price">'+ data.discountedPrice + ' -' + (100 - data.discountedPrice * 100 / data.price).toFixed() + '%'+'</span>' + '<span class="card-price">'+ data.price +'</span>'}
                          ${data.hasNew ? '<span class="card-has-new">New</span>' : ''} `;
        return item;
    }

    // Вывод карточке в зависимости от екрана
    if (document.body.clientWidth > 1024) {
        for (let i = 0; i < 4; i++) {
            catalog.appendChild(createItem(data[i]));
        }
    } else if (document.body.clientWidth > 768 && document.body.clientWidth <= 1024) {
        for (let i = 0; i < 3; i++) {
            catalog.appendChild(createItem(data[i]));
        }
    } else if (document.body.clientWidth <= 768) {
        for (let i = 0; i < 2; i++) {
            catalog.appendChild(createItem(data[i]));
        }
    };

    // Вывод карточке в зависимости от екрана при resize
    window.addEventListener("resize", function () {
        catalog.innerHTML = "";
        if (document.body.clientWidth > 1024) {
            for (let i = 0; i < 4; i++) {
                catalog.appendChild(createItem(data[i]));
            }
        } else if (document.body.clientWidth > 768 && document.body.clientWidth <= 1024) {
            for (let i = 0; i < 3; i++) {
                catalog.appendChild(createItem(data[i]));
            }
        } else if (document.body.clientWidth <= 768) {
            for (let i = 0; i < 2; i++) {
                catalog.appendChild(createItem(data[i]));
            }
        };

    });

    // Запомнить товар по которому был клик
    catalog.addEventListener("click", function (e) {
        let target = e.target;
        while (target != this) {
            if (target.classList.contains("card")) {
                let id = target.getAttribute("data-id");
                localStorage.setItem("itemId", id);
                document.location.href = "item.html";
            }
            target = target.parentNode;
        }
    });
});