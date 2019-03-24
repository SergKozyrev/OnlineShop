# OnlineShop
https://sergkozyrev.github.io/OnlineShop/index.html
### Markup
* For screen width larger than 375px (including) pages should use mobile layout.
* For screen width larger than 768px (including) page should use tablet layout.
  Page layout can be switched from mobile to tablet layout earlier than 768px if you see that this wouldn’t break your layout.
* For screen width larger than 1024px page should use desktop layout.
* Main content area shouldn't stretch more than 1180px.
* All links and buttons have noticeable hover and active state.
* Mobile version should have mobile menu.
### Functionality
#### Home page
* Click on “Nike Red” (block under carousel) should navigate user to Item details page.
* Click on “Caps & Hats” (block under carousel) should navigate user to Catalog page.
* Search field should be collapsed by default on tablet. Click on magnifying glass icon should
expand search field to the left. 
#### Catalog page
* Hover over item block should highlight item title and show overlay with “View Item” text for
item image.
* Click on item block should navigate user to Item details page.
* Filters for Catalog page should be implemented as dropdown lists on Desktop.
  Dropdown should be opened on hover over filter bar element.
* Selected filter value should be highlighted in dropdown list.
#### Item details page
* Click on “Back to catalog” link should navigate user to Catalog page.
* Click on buttons in Size and Color sections should highlight it. Only one button per section can be
selected.
* Click on "Add to bag" item should update items count and Total Cost in header.
Items count should be increased by one, Total Cost should be increased by discountedPrice
value for "Dark classic fit suit" item provided in catalog.js file.
#### Shopping bag
* Shopping bag page should display only discounted price values.
* Hover over item block should highlight item title and show overlay with “View Item” text for
item image.
* Click on "Clear bag" link should remove all product items from Shopping bag and replace them
with text "Your shopping bag is empty. Use Catalog to add new items".
Remove Total Cost from header and items count should be displayed as (0).
* Click on "Buy now" should remove all product items from Shopping bag and replace them with
text "Thank you for your purchase".
Remove Total Cost from header and items count should be displayed as (0).
* Click on “+” or “-“ buttons in “Quantity” field should increase/decrease this number by 1.
“Total Cost” at the bottom and Total Cost and Quantity in the header should be updated
accordingly to action and discountedPrice of the element item provided in catalog.js file.
* Click on “Remove item” button should remove item from the age.
“Total Cost” at the bottom and Total Cost and Quantity in the header should be updated
accordingly to Quantity of removed items and their total discountedPrice.
### Extra miles
#### Item details page
* Implement photos switcher.
  Click on thumbnail should replace main image with full size image of itself, and make thumbnail active.
#### Shopping bag
(Full shopping bag functionality with JS)
* Create one more detailed item page (so you will be able to add different items to shopping bag).
* Create persistent storage for Shopping bag data so it is saved when user navigated across the
site (use LocalStorage).
* Click on "Add to bag" button should add item to persistent shopping cart storage:
If two items in bag has same name, size and color - they should be combined on the
Shopping bag page. Quantity field in shopping bag item should reflect number of similar
items.
If two items in bag has same name, but different size and/or color - they shouldn't be
combined.
* Every time when user click on "Add to bag" button - items count and Total Cost in header should
be recalculated accordingly to price in catalog.js file.
#### Filter functionality
This extra mile describes behavior of filters bar and related element. Real items filtering on catalog page
is not supposed.
* Only one value per filter can be selected for simplicity.
* For tabled and mobile all filters are combined into single block which should be opened by click
anywhere on filters bar and displayed above page content.
* Click on value in any category should highlight this value and update filters bar:
Desktop: If “Not selected” is selected value for filter category – only category title
should be displayed in the filters bar element. Otherwise both category title and value
should be displayed in filter bar element.
Tablet and mobile: All selected filter values and category titles should be concatenated
in single string with “, ” as separator. If filter category has selected value it should be
displayed and highlighted in filters bar. Otherwise filter category title should be
displayed (without highlight).
#### Dynamic content rendering
Catalog page must use dynamic content rendering.
* Items from provided catalog.js should be:
    Filtered by “category” “women” and “fashion” “Casual style”.
    Ordered by date in descending order by “dateAdded” (newest first).
* Promo block (“Last weekend extra 50% off…”) should be displayed after four items for desktop,
3 items for tablet and 2 items on mobile. This should during page resize (without page reload).
* Items that has hasNew property equal to true should be displayes with New laben near to the
price.
* Items that has different price and discountedPrice values shoud be displayed accordingly to
layout (discounted percent should be calculated from price and discountedPrice)
* If both price and discountedPrice fields are null – display value of placeholder field instead of
price.
