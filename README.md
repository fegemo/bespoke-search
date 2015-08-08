[![Build Status](https://secure.travis-ci.org/fegemo/bespoke-search.png?branch=master)](https://travis-ci.org/fegemo/bespoke-search) [![Coverage Status](https://coveralls.io/repos/fegemo/bespoke-search/badge.png)](https://coveralls.io/r/fegemo/bespoke-search)

# bespoke-search

Allows searching for content inside the presentation

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/fegemo/bespoke-search/master/dist/bespoke-search.min.js
[max]: https://raw.github.com/fegemo/bespoke-search/master/dist/bespoke-search.js

## Usage

This plugin is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  search = require('bespoke-search');

bespoke.from('#presentation', [
  search()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.search()
]);
```

## Package managers

### npm

```bash
$ npm install bespoke-search
```

### Bower

```bash
$ bower install bespoke-search
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
