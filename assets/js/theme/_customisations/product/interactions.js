export default class {
    constructor(context) {
        this.context = context;
        this.initRecentlyViewedProducts();
        this.bind();
    }

    initRecentlyViewedProducts() {
        const productId = $('.productView').data('entity-id');
        const rvKey = '__recently-viewed';
        if (productId) {
            const recentlyViewed = this.context.helpers.getStorage(rvKey);
            let recentlyViewedArr = [];

            if (recentlyViewed !== null) {
                recentlyViewedArr = JSON.parse(recentlyViewed);
            }

            const existIndex = recentlyViewedArr.indexOf(productId);

            if (existIndex > -1) {
                recentlyViewedArr.splice(existIndex, 1);
            }

            recentlyViewedArr.unshift(productId);

            if (recentlyViewedArr.length > 7) {
                recentlyViewedArr.pop();
            }

            this.context.helpers.setStorage(rvKey, JSON.stringify(recentlyViewedArr), true);

            const dupIndex = recentlyViewedArr.indexOf(productId);
            if (dupIndex > -1) {
                recentlyViewedArr.splice(dupIndex, 1);
            }

            if ($('[data-recentlyviewed]').length > 0) {
                let count = recentlyViewedArr.length;
                if (count > 4) count = 4;
                for (let p = 0; p < count; p++) {
                    if (p === 4) {
                        break;
                    }
                    this.context.utils.api.product.getById(recentlyViewedArr[p], { template: 'products/card' }, (err, response) => {
                        $('[data-recentlyviewed]').append(`<li class="product-card">${response}</li>`);

                        // Trigger event `update-product-card` to hook when card is added
                        const updateCard = new CustomEvent('update-product-card', { detail: $('[data-recentlyviewed]').last('article.card') });
                        document.dispatchEvent(updateCard);
                    });
                }
            }
        }
    }

    addProductsToCart(_this, btn, productsObj) {
        /* get cart */
        _this.getCart('/api/storefront/carts')
            .then(data => {
                if (data.length > 0) {
                    /* Cart exists so add to it */
                    const cartId = data[0].id;
                    /* Add line items */
                    _this.addCartItem('/api/storefront/carts/', cartId, {
                        lineItems: productsObj,
                    }).then(cartItemData => {
                        $('body').trigger('refresh-cart-quantity', cartItemData.id);
                        btn.text(btn.data('ogLabel')).removeClass('disabled').addClass('added');
                        setTimeout(() => {
                            btn.removeClass('added');
                        }, 5000);
                    }).catch(error => { throw new Error(`ADD CART ITEMS: ${error}`); });
                } else {
                    _this.createCart('/api/storefront/carts', {
                        lineItems: productsObj,
                    })
                        .then(cartData => {
                            $('body').trigger('refresh-cart-quantity', cartData.id);
                            btn.text(btn.data('ogLabel')).removeClass('disabled').addClass('added');
                            setTimeout(() => {
                                btn.removeClass('added');
                            }, 5000);
                        }).catch(error => { throw new Error(`ADD CART ITEMS: ${error}`); });
                }
            }).catch(error => { throw new Error(`GET CART: ${error}`); });
    }

    processProductIds(_this, btn, compiledProductIds) {
        const productsObj = [];
        const productVariants = [];

        for (let p = 0; p < compiledProductIds.length; p++) {
            const productId = compiledProductIds[p];
            const productVariant = fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${_this.context.storefront_api.token}`,
                },
                body: JSON.stringify({
                    query: `
                    query SingleProduct {
                        site {
                            products (entityIds: [${productId}]) {
                            edges {
                                node {
                                variants(first: 1) {
                                    edges {
                                    node {
                                        entityId
                                    }
                                    }
                                }
                                }
                            }
                            }
                        }
                        }
                        `,
                }),
            })
                .then(productRes => productRes.json())
                .then(productJson => {
                    const variantId = productJson.data.site.products.edges[0].node.variants.edges[0].node.entityId;
                    productsObj.push({
                        quantity: 1,
                        productId,
                        variantId,
                    });
                });

            productVariants.push(productVariant);
        }

        Promise.all(productVariants).then(() => {
            _this.addProductsToCart(_this, btn, productsObj);
        });
    }

    addBulkToCart(e) {
        const _this = this;
        const btn = $(e.target);
        let products;
        const compiledProductIds = [];
        const btnLabel = btn.text();
        btn.text('Adding...').data('ogLabel', btnLabel).addClass('disabled');

        if (btn[0].hasAttribute('data-add-category')) {
            const path = window.location.pathname;
            fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${_this.context.storefront_api.token}`,
                },
                body: JSON.stringify({
                    query: `
                    query CategoryByUrl {
                        site {
                          route(path: "${path}") {
                            node {
                              id
                              ... on Category {
                                name
                                entityId
                                description
                                products(first: 50) {
                                  edges {
                                    node {
                                      entityId
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                     `,
                }),
            })
                .then(categoryRes => categoryRes.json())
                .then(categoryJson => {
                    const productIds = categoryJson.data.site.route.node.products.edges;

                    for (let p = 0; p < productIds.length; p++) {
                        compiledProductIds.push(productIds[p].node.entityId);
                    }

                    _this.processProductIds(_this, btn, compiledProductIds);
                });
        } else {
            products = btn.next('.productGrid').find('article.card');

            products.each((i, a) => {
                compiledProductIds.push($(a).data('entity-id'));
            });

            _this.processProductIds(_this, btn, compiledProductIds);
        }
    }

    closeMobileNav(e) {
        e.preventDefault();

        $('body').removeClass('has-activeNavPages');
        $('header, .mobileMenu-toggle, #menu').removeClass('is-open');
    }

    bind() {
        $('[data-add-bulk-to-cart]').on('click', (e) => this.addBulkToCart(e));
        $('[data-mobile-nav-toggle], [data-header-shroud]').on('click', (e) => this.closeMobileNav(e));
    }
}
