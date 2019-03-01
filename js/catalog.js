window.addEventListener("DOMContentLoaded", function () {

    let data = window.catalog;
    let filter = document.getElementsByClassName("catalog-filter")[0];
    let mobileFilter = document.getElementsByClassName("filter-list-mobile")[0];
    let items = document.getElementsByClassName("items-wrap")[0];
    let showMore = document.getElementsByClassName("catalog-btn")[0];

    function sortByDate(a, b) {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    let newData = data.filter(item => item.category === "women" && item.fashion === "Casual style")
    newData.sort(sortByDate);
    data.sort(sortByDate);
    // Фильтр
    filter.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.classList.contains("sub-list-item")) return;
        let parentList = target.parentElement.parentElement; //Родитель родителя елемента по которому был клик (родительский li)
        let parentListHtml = parentList.getElementsByClassName("list-item-caption")[0].innerHTML; //InnerHtml родительского li по умолчанию
        let subListItem = target.parentElement.children; // Дети родителя елемента по которому был клик (родительский ul в котором подменю)
        let mobilList = document.querySelector(".filter-list-mobile"); // Мобильный список
        let mobileItem = mobilList.getElementsByClassName("filter-list-item-mobile"); // Елемент мобильного списка
        let index = [...parentList.parentNode.children].indexOf(parentList); //Индекс елемента по которому был клик(преобразует NodeList в массив)
        let value = parentList.getElementsByClassName("select-value")[0]; // Значение фильтра в родительском елементе
        let targetHtml = target.innerHTML; // InnerHTML елемента по которому был клик
        if (targetHtml === "Not selected") { // Если InnerHTML елемента по которому был клик равен "Not selected"
            parentList.classList.remove("select"); // У родительского li убрать класс "select"
            for (let i = 0; i < subListItem.length; i++) {
                subListItem[i].classList.remove("highlight"); // У всех елементов подменю убрать класс
            }
            mobileItem[index].innerHTML = parentListHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML  родительского li по умолчанию
            mobileItem[index].classList.remove("select"); //Елементу мобильного списка убрать класс
        } else {
            parentList.classList.add("select"); // Родительскому li добавить класс "select"
            value.innerHTML = targetHtml; // Значение фильтра в родительском елементе на InnerHTML елемента по которому был клик 
            mobileItem[index].innerHTML = targetHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML елемента по которому был клик 
            mobileItem[index].classList.add("select"); //Елементу мобильного списка добавить класс
            for (let i = 0; i < subListItem.length; i++) {
                subListItem[i].classList.remove("highlight"); // У всех елементов подменю убрать класс
            }
            target.classList.add("highlight"); // Добавить класс елементу по котрому был клик
        }
    });

    // Создание товара
    function createItem(data) {
        let item = document.createElement("div");
        item.className = "catalog-item";
        item.setAttribute("data-id", data.id);
        item.innerHTML = `<div class="catalog-item-img">
                          <div class="item-img-overlay">
                          <span>View item</span>
                          </div>
                          <img src="${data.thumbnail}" alt="${data.title}">
                          </div>
                          <h4 class="catalog-item-title">${data.title}</h4>
                          ${data.discountedPrice === null && data.price === null ? '<p class="catalog-item-placeholder">'+data.placeholder+'</p>' : data.discountedPrice === data.price ? '<span class="catalog-item-price">'+ data.price +'</span>' : '<span class="catalog-item-discount-price">'+ data.discountedPrice + ' -' + (100 - data.discountedPrice * 100 / data.price).toFixed() + '%'+'</span>' + '<span class="catalog-item-price">'+ data.price +'</span>'}
                          ${data.hasNew ? '<span class="catalog-item-has-new">New</span>' : ''} 
                          </div>`;
        return item;
    }

    // Заполнение товарами
    for (let i = 0; i < 12; i++) {
        items.appendChild(createItem(newData[i]));
    }

    // Запомнить товар по которому был клик
    items.addEventListener("click", function (e) {
        let target = e.target;
        while (target != this) {
            if (target.classList.contains("catalog-item")) {
                let id = target.getAttribute("data-id");
                localStorage.setItem("itemId", id);
                document.location.href = "item.html";
            }
            target = target.parentNode;
        }
    });

    // Показ еще 4 товаров
    showMore.addEventListener("click", function () {
        let itemsCount = items.children.length;
        if (document.body.clientWidth > 1024) {
            for (let i = itemsCount - 1; i < itemsCount + 3; i++) {
                if (itemsCount > data.length) this.remove();
                items.appendChild(createItem(data[i]));
            }
        } else if (document.body.clientWidth > 768 && document.body.clientWidth <= 1024) {
            for (let i = itemsCount - 1; i < itemsCount + 2; i++) {
                if (itemsCount > data.length) this.remove();
                items.appendChild(createItem(data[i]));
            }
        } else if (document.body.clientWidth <= 768) {
            for (let i = itemsCount - 1; i < itemsCount + 1; i++) {
                if (itemsCount > data.length) this.remove();
                items.appendChild(createItem(data[i]));
            }
        }
    });

    // Создание промо блока
    function createPromo() {
        let promo = document.createElement("div");
        promo.className = "catalog-promo";
        promo.innerHTML = `
        <h2 class="promo-title">Last weekend <span class="promo-title-red-text">extra 50%</span>
            off on all reduced boots and shoulder bags</h2>
        <p class="promo-desc">This offer is valid in-store and online. Prices displayed reflect
            this additional discount. This offer ends at 11:59 GMT on March 1st 2015</p>`;
        return promo;
    }

    // Вывод промо блока в зависимости от устройства
    if (document.body.clientWidth > 1024) {
        items.insertBefore(createPromo(), items.children[4]);
    } else if (document.body.clientWidth > 768 && document.body.clientWidth <= 1024) {
        items.insertBefore(createPromo(), items.children[3]);
    } else if (document.body.clientWidth <= 768) items.insertBefore(createPromo(), items.children[2]);

    // Вывод промо блока в зависимости от устройства при resize
    window.addEventListener("resize", function () {
        items.querySelector(".catalog-promo").remove();
        if (document.body.clientWidth > 1024) {
            items.insertBefore(createPromo(), items.children[4]);
        } else if (document.body.clientWidth > 768 && document.body.clientWidth <= 1024) {
            items.insertBefore(createPromo(), items.children[3]);
        } else if (document.body.clientWidth <= 768) items.insertBefore(createPromo(), items.children[2]);
    });

    //Показать мобильный фильтр
    mobileFilter.addEventListener("click", function (e) {
        let target = e.target;
        if (target.classList.contains("close-filter")) {
            filter.classList.remove("filter-open");
        } else filter.classList.add("filter-open");
    });

});