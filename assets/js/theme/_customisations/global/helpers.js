export default class {
    constructor(context) {
        this.context = context;
        this.bind();
    }

    /**
     *  BigCommerce Storefront API Cart Functions
     */

    /**
     *  Get Checkout
     *
        getCheckout(cartId)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));
     */
    getCheckout(cartId) {
        return fetch(`/api/storefront/checkouts/${cartId}`, {
            method: 'GET',
            credentials: 'same-origin',
        }).then(response => response.json());
    }

    /**
     *  Create cart
     *
        createCart({
            "lineItems": [
            {
                "quantity": 1,
                "productId": 86
            },
            {
                "quantity": 1,
                "productId": 88
            }
            ]}
            )
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));
     */
    createCart(cartItems) {
        return fetch('/api/storefront/carts', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        }).then(response => response.json());
    }

    /**
     *  Get cart
     *
        getCart('lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));
     */
    getCart(includes) {
        const url = '/api/storefront/carts';
        let query = '';
        if (includes) {
            query = `?include=${includes}`;
        }
        return fetch(`${url}${query}`, {
            method: 'GET',
            credentials: 'same-origin',
        }).then(response => response.json());
    }

    /**
     *  Add a cart item
     *
        addCartItem(`d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`, {
            "lineItems": [
                {
                "quantity": 1,
                "productId": 97
                }
            ]
            })
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error));
     */
    addCartItem(cartId, cartItems) {
        return fetch(`/api/storefront/carts/${cartId}/items`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        }).then(response => response.json());
    }

    /**
     *  Delete a cart item
     *
        deleteCartItem(`d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`, `3f8dd1ed-f917-41be-b7f7-20c10f406e09`)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(error));
     */
    deleteCartItem(cartId, itemId) {
        return fetch(`/api/storefront/carts/${cartId}/items/${itemId}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            /* eslint-disable */
            if (response.statusText === 'No Content') {
                return true;
            } else {
                return response.json();
            }
            /* eslint-enable */
        });
    }

    /**
     *  GraphQL helper function
     *
     *  REQUIRED: {{~inject 'settings' settings}} in layout files
     *
        graphQL(
            `query Query {
                site {
                    product(sku: "12345") {
                        id
                        entityId
                        name
                    }
                }
            })`,
            (json) => {
                console.log(json);
            },
            true);
     */
    graphQL(query, callback, debug) {
        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.settings.storefront_api.token}`,
            },
            body: JSON.stringify({
                query,
            }),
        }).then(res => res.json())
            .then(json => {
                if (debug === true) {
//                     console.log(json);
                }

                callback(json);
            });
    }

    /**
     *  Get local / session storage
     */
    getStorage(key) {
        try {
            const sessionValue = sessionStorage.getItem(key);
            if (sessionValue) {
                return sessionValue;
            }

            const localValue = localStorage.getItem(key);
            if (localValue) {
                return localValue;
            }
        } catch (e) {
            const name = `${key}=`;
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        }

        return null;
    }

    /**
     *  Set local / session storage
     */
    setStorage(key, value, expire) {
        try {
            // Use Local / Session storage
            if (expire) {
                sessionStorage.setItem(key, value);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            // Use Cookies
            let exDays = 365;
            if (expire) {
                exDays = 1;
            }
            const d = new Date();
            d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
            const expires = `expires=${d.toUTCString()}`;
            document.cookie = `${key}=${value};${expires};path=/`;
        }
    }

    /**
     *  Grab and display segment page
     */
    getSegment(container, id, callback) {
        if (container.length > 0) {
            container.load(`/__segments/${id}/ #segment`, () => {
                const content = $('#segment').html();
                container.html(content);

                if ($(container).find('[data-dynamic-content-table]').length) {
                    this.getVariablesFromWebPage(this, $(container).find('[data-dynamic-content-table]'));
                }

                if (callback) {
                    callback();
                }
            });
        }
    }

    /**
     *  Remove local / session storage
     */
    removeStorage(key) {
        try {
            const sessionValue = sessionStorage.getItem(key);
            if (sessionValue) {
                sessionStorage.removeItem(key);
            }

            const localValue = localStorage.getItem(key);
            if (localValue) {
                localStorage.removeItem(key);
            }
        } catch (e) {
            // Use Cookies
            const d = new Date();
            d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
            const expires = `expires=${d.toUTCString()}`;
            document.cookie = `${key}=;${expires};path=/`;
        }
    }

    /**
     *  Load segment into page where specified
     */
    loadSegment(_this, ele) {
        const container = $(ele);
        const segment = container.data('load-segment');
        _this.getSegment(container, segment);
    }

    /**
     *  Web Pages - Dynamic Content
     */
    getVariablesFromWebPage(_this, ele) {
        if ($(ele).length) {
            const contentTable = $(ele).html();
            const tr = $(contentTable).find('tr');
            const data = [];

            tr.each((i, element) => {
                let varName = $(element).find('td:nth-child(1)').html();
                const varValue = $(element).find('td:nth-child(2)').html();

                // getting varName between []
                varName = varName.match(/\[(.*)\]/);

                if (varName && varName.length > 1) {
                    varName[1] = varName[1].replace(' ', '-').toLowerCase();
                    data.push({
                        varName: varName[1],
                        value: varValue,
                    });
                }
            });

            data.forEach((object) => {
                const targets = $(`[data-${object.varName}]`);
                let uniqueCounter = 1;

                if (targets.length) {
                    targets.each((i, target) => {
                        const attrValue = $(target).data(object.varName);

                        if (($.trim(object.value) === '' || object.value === '&nbsp;') && $(target).data('remove-element') !== 'undefined') {
                            $(target).remove();
                        } else if (attrValue === 'src') {
                            const dataCleaned = _this.stripTags(object.value);
                            $(target).attr('src', dataCleaned);
                        } else if (attrValue === 'href') {
                            const dataCleaned = _this.stripTags(object.value);
                            $(target).attr('href', dataCleaned);
                        } else if (attrValue === 'text') {
                            const dataCleaned = _this.stripTags(object.value);
                            $(target).text(dataCleaned);
                        } else if (attrValue.startsWith('attr-')) {
                            const dataCleaned = _this.stripTags(object.value);
                            $(target).attr(attrValue.replace('attr-', ''), dataCleaned);
                        } else if (attrValue === 'html') {
                            $(target).html(object.value);
                        } else if (attrValue === 'style-background-image') {
                            const dataCleaned = _this.stripTags(object.value);
                            $(target).attr('style', `background-image: url(${dataCleaned})`);
                        } else if (attrValue === 'repeater') {
                            $(target).html(object.value).find('table').attr('data-repeater-name', `${object.varName}_${uniqueCounter}`).hide();
                            _this.setupRepeater(`${object.varName}_${uniqueCounter}`, uniqueCounter);
                            uniqueCounter++;
                        }
                    });
                }
            });
        }
    }

    stripTags(value) {
        // removing all html tags
        const div = document.createElement('div');
        let varValue = value;
        div.innerHTML = varValue;
        varValue = div.textContent || div.innerText || '';
        $(div).remove();
        varValue = varValue.trim();

        return varValue;
    }

    timeConvert(t) {
        // Check correct time format and split into components
        let time = t.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [t.toLowerCase().replace(/^0+/, '').replace(' ', '')];
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    currency(value) {
        const dollarFormat = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
        });

        return dollarFormat.format(value);
    }

    setupRepeater(varName) {
        const repeater = [];
        const repeaterTable = $(`[data-repeater-name="${varName}"]`);
        let excludeFields = '';

        if (typeof repeaterTable.parent().data('repeater_exclude_fields') !== 'undefined') {
            excludeFields = repeaterTable.parent().data('repeater_exclude_fields').split(',');
        }

        // Change first row to table headings
        repeaterTable.find('tr:first-child td').each((i, a) => {
            $(a).replaceWith(`<th>${$(a).text()}</th>`);
        });

        if (repeaterTable.length) {
            const columnNames = repeaterTable.find('th').map((i, a) => $(a).text().replace(/\s+/g, '_').toLowerCase());

            repeaterTable.find('tr:not(:first-child)').each((i, a) => {
                const rowValues = {};
                $(a).find('td').each((index, b) => {
                    rowValues[columnNames[index]] = $(b).html();
                });
                repeater.push(rowValues);
            });
        }

        // setup repeater rows
        if (repeaterTable.length) {
            let count = 1;
            repeater.forEach(row => {
                repeaterTable.parent().append(`<div data-row-count="${count}"></div>`);
                const rowFields = [];
                $.each(row, (key, value) => {
                    if (value === '&nbsp;') {
                        value = '';
                    }
                    if ($.inArray(key, excludeFields) === -1 && $.trim(value) !== '') {
                        rowFields.push(`<div class="${key}">${value}</div>`);
                    }
                });
                repeaterTable.parent().find(`[data-row-count="${count}"]`).html(rowFields);
                count++;
            });
        }

        repeaterTable.remove();
        return repeater;
    }

    /**
     *  Mutation Observer helper function
     *
        observe((mutations, me) => {
            const element = document.getElementById('elementId');
            if ($(element).length > 0) {
                // Do something

                me.disconnect(); // stop observing
                return;
            }
        });
     */
    observe(func) {
        // set up the mutation observer
        const observer = new MutationObserver((mutations, me) => {
            // `mutations` is an array of mutations that occurred
            // `me` is the MutationObserver instance
            func(mutations, me);
        });

        // start observing
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
    }


    bind() {
        $('[data-load-segment]').each((i, a) => this.loadSegment(this, a));
        $('[data-dynamic-content-table]').each((i, a) => this.getVariablesFromWebPage(this, a));
    }
}
