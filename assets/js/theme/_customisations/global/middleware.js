/**
 * BC `config.json` requires the following under `settings`:
 *
 * "middlewareCreds": {
 *    "key": "",
 *    "prod": "https://client.matter.design/",
 *    "sandbox": "https://sandbox.client.matter.design/",
 *    "test": "https://test.client.matter.design/",
 *    "local": "http://localhost:8101/"
 *  },
 */

export default class Middleware {
    constructor(context) {
        this.context = context;
        this.creds = context.themeSettings.middlewareCreds;
        this.key = this.creds.key;
        this.path = this.selector();
    }

    selector() {
        let mwUrl = this.creds.prod;
        switch (window.location.host) {
        case 'https://client-prod-environment.mybigcommerce.com/':
            mwUrl = this.creds.prod;
            break;
        case 'https://client-staging-environment.mybigcommerce.com/':
            mwUrl = this.creds.sandbox;
            break;
        case 'https://client-test-environment.mybigcommerce.com/':
            mwUrl = this.creds.test;
            break;
        case 'localhost:3000':
            mwUrl = this.creds.local;
            break;
        default:
            mwUrl = this.creds.prod;
            break;
        }
        return mwUrl;
    }

    runFetch(uri, method, additionalOptions) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-Client-By': this.key,
            },
            ...additionalOptions,
        };
        return fetch(uri, options).then(response => response.json());
    }

    // getStoredOrRaw(callback) {
    //     const _this = this;
    //     let data = this.context.helpers.getStorage('_client-storage-key');
    //     if (!data) {
    //         this.runFetch(`${this.path}api/endpoint`, 'GET').then(obj => {
    //             const json = JSON.stringify(obj);
    //             _this.context.helpers.setStorage('_client-storage-key', json);
    //             if (callback) {
    //                 callback(json);
    //             }
    //         });
    //     } else {
    //         callback(data);
    //     }
    // }

    // getRaw(value, callback) {
    //     this.runFetch(`${this.path}api/endpoint?variable=${value}`, 'GET').then(obj => {
    //         const json = JSON.stringify(obj);
    //         if (callback) {
    //             callback(json);
    //         }
    //     });
    // }
}
