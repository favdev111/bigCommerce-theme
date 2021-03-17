# Product functionality

## Add bulk products to cart
This can be added to a category page or wishlist page (or anywhere listing multiple products really). But default the function is bound to a button with `data-add-bulk-to-cart` sitting above the `.productGrid` container that lists out products using `article.card` container. If on a category page that contains pagination, add `data-add-category` to the button and a GraphQL call will be made to get all products within that category (GraphQL currently set to get first 50 products in category. If your category counts are higher, increase and test that number).
