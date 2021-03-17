# Enable JS customisations in theme

1. Add the following to the imports list in the `global.js` file:
```js
import customFunctions from './customisations';
```
2. Add the function within the `onReady` function:
```js
customFunctions(this.context);
```

## Polyfills

Some functions within our work require polyfills to work in older browsers.
For example, IE11 doesn't support promises or window.fetch. To get this working, install the following polyfills and import them into the relevant scripts:
```
npm install whatwg-fetch --save
npm install promise-polyfill --save-exact
```
```js
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
```

## Useful packages

# In-View
[https://github.com/camwiegert/in-view](Documentation on GitHub)
**Install**
```
npm install --save in-view
```
```js
import inView from 'in-view';
```

# Rough Notation
[https://roughnotation.com/](Website)
[https://github.com/pshihn/rough-notation](Documentation on GitHub)
**Install**
```
npm install --save rough-notation
```
```js
import { annotate } from 'rough-notation';

const e = document.querySelector('#myElement');
const annotation = annotate(e, { type: 'underline' });
annotation.show();
```
