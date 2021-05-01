[![Build Status](https://secure.travis-ci.org/fegemo/bespoke-search.png?branch=master)](https://travis-ci.org/fegemo/bespoke-search) [![Coverage Status](https://coveralls.io/repos/fegemo/bespoke-search/badge.png)](https://coveralls.io/r/fegemo/bespoke-search)

# bespoke-search

Allows searching for content (<kbd>ctrl-f</kbd>) inside a bespoke presentation. See our [demo](https://fegemo.github.io/bespoke-search).

![Video showing a demo usage of bespoke-search](https://fegemo.github.io/cefet-front-end-large-assets/apng/bespoke-search.png)

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/fegemo/bespoke-search/master/dist/bespoke-search.min.js
[max]: https://raw.github.com/fegemo/bespoke-search/master/dist/bespoke-search.js


## Usage

This plugin is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
const bespoke = require('bespoke')
const search = require('bespoke-search')

bespoke.from('#presentation', [
  search()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.search()
])
```


## Configuring bespoke-search

We can provide an `options` argument to `search()`, whose structure and default values are:

```js
const defaultOptions = {
  insertStyles: true,
  keys: {
    show: 'ctrl-f',
    dismiss: 'esc',
    trigger: 'enter',
    next: 'tab',
    previous: 'shift-tab'
  },
  text: {
    instructions: 'Instructions',
    searchHere: 'Search here...',
    openSearch: 'Open search',
    closeSearch: 'Close search',
    search: 'Search',
    nextResult: 'Next result',
    previousResult: 'Previous result'
  }
}
bespoke.from('#presentation', [
  search(options)
])
```

1. `insertStyles` (boolean, default: `true`) defines whether the plugin should include a `<style>` with proper styling. If the used theme already styles bespoke-search HTML elements, you can set this to `false`
1. `keys` (object) allows setting the keystrokes (and combinations) to trigger bespoke-search events, such as starting or dissmissing a search. Each value can be a string or an array of strings (multiple keys can be attached). Values should be strings from [keymage][keymage].
1. `text` (object) allows customizing the text shown by the search panel. It defaults to the previously presented words in English.

[keymage]: https://www.npmjs.com/package/keymage


## Styling bespoke-search

The plugin adds to the `deck.parent` the following structure of HTML elements:

```html
<div id="bespoke-search-parent" class="bespoke-search-searching">
  <div id="bespoke-search">
    <input id="bespoke-search-input" type="search">
    <span id="bespoke-search-results-count"></span>
    <details id="bespoke-search-info">
      <summary>Instructions</summary>
      <span class="bespoke-search-info-pair"><kbd>ctrl-f</kbd> Open search</span>
      ...
    </details>
  </div>
</div>
```

See [lib/bespoke-search.css][search-css] if you want to create all the styling yourself (using `insertStyles: false`) or if you need to override just part of it.

[search-css]: lib/bespoke-search.css


## Package managers

### npm

```bash
$ npm install bespoke-search
```


## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
