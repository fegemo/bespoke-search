(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const bespoke = require('bespoke')
const keys = require('bespoke-keys')
const touch = require('bespoke-touch')
const scale = require('bespoke-scale')
const bullets = require('bespoke-bullets')
const theme = require('bespoke-theme-cube')
const classes = require('bespoke-classes')
const search = require('../dist/bespoke-search.js')

bespoke.from('article', [
  keys(),
  touch(),
  theme(),
  scale('transform'),
  bullets('.bulleted > *'),
  classes(),
  search()
])

},{"../dist/bespoke-search.js":2,"bespoke":9,"bespoke-bullets":3,"bespoke-classes":4,"bespoke-keys":5,"bespoke-scale":6,"bespoke-theme-cube":7,"bespoke-touch":8}],2:[function(require,module,exports){
(function (global){(function (){
/*!
 * bespoke-search v1.0.0
 *
 * Copyright 2021, Flávio
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.search = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
var css = ":root{--search-result-bg:yellow;--search-result-focused-bg:orange}#bespoke-search-parent{--search-parent-bg:#0006;--search-margin:0.5em;--search-bg:#fff3;--search-input-length:12em;--search-input-position:flex-end;--search-input-color:#333;--search-info-color:#333;--search-info-kbd-color:#000;--search-info-kbd-bg:#ccc;--search-no-result-color:#8b0000;position:absolute;left:0;top:0;right:0;bottom:0;display:flex;flex-direction:column;justify-content:var(--search-input-position);align-items:center;pointer-events:none;opacity:0;transition:all .2s ease;background-color:var(--search-parent-bg);font-size:1.25rem;perspective:900px}#bespoke-search-parent.bespoke-search-searching{opacity:1;pointer-events:auto;z-index:1000}#bespoke-search{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;align-items:baseline;margin:var(--search-margin);padding:1em;border-radius:10px;box-sizing:content-box;width:calc(var(--search-input-length) + 5em);background-color:var(--search-bg);backdrop-filter:blur(6px);transition:all .3s cubic-bezier(.06,.99,.46,1.16);transform:translateY(-60px) rotateX(90deg);opacity:0}#bespoke-search-results-count{font-size:.75em;font-family:monospace}.bespoke-search-no-result>#bespoke-search-input{outline:1px solid currentColor;border-color:transparent;color:var(--search-no-result-color)}.bespoke-search-result{background-color:var(--search-result-bg,#ff0)}.bespoke-search-result-focused{background-color:var(--search-result-focused-bg,orange)}#bespoke-search-input{width:var(--search-input-length);padding:.25em .45em;border:1px solid currentColor;border-radius:5px;color:var(--search-input-color);font-size:1em}.bespoke-search-searching #bespoke-search{transform:scale(1);opacity:1}#bespoke-search-info{width:100%;margin-top:1em;font-size:.7em;text-align:left;color:var(--search-info-color)}.bespoke-search-info-pair{margin-right:1em;white-space:nowrap;display:inline-flex;align-items:center;margin-bottom:.25em}#bespoke-search-info kbd{margin:0 .1em;padding:.1em .6em;border-radius:3px;border:1px solid #ccc;color:var(--search-info-kbd-color);line-height:1.4;font-size:.7em;display:inline-block;box-shadow:0 1px 0 #0009,inset 0 0 0 2px #ccc;background-color:var(--search-info-kbd-bg)}#bespoke-search-info kbd:last-of-type{margin-right:1em}#bespoke-search-info summary{display:list-item;counter-increment:list-item 0;list-style:inside disclosure-closed;cursor:pointer}#bespoke-search-info[open]>summary:first-of-type{list-style-type:disclosure-open}.bespoke-bullets-off .bespoke-bullet.bespoke-bullet-inactive{opacity:1;transform:none}.bespoke-search-shaking{animation:shaking .5s ease-out 0s 1}@keyframes shaking{0%{transform:translate3d(4px,0,0)}10%{transform:translate3d(-7px,-5px,0)}20%{transform:translate3d(8px,5px,0)}30%{transform:translate3d(-7px,3px,0)}40%{transform:translate3d(9px,-3px,0)}50%{transform:translate3d(-4px,3px,0)}60%{transform:translate3d(4px,-4px,0)}70%{transform:translate3d(-5px,-4px,0)}80%{transform:translate3d(4px,2px,0)}90%{transform:translate3d(-3px,-1px,0)}100%{transform:translate3d(0,0,0)}}@media (prefers-color-scheme:dark){#bespoke-search-parent{--search-parent-bg:#fff6;--search-bg:#0003;--search-info-color:#eee}}"; (_dereq_("browserify-css").createStyle(css, { "href": "lib\\bespoke-search.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":3}],2:[function(_dereq_,module,exports){
const keymage = _dereq_('keymage')
const makeArray = obj => Array.isArray(obj) ? obj : [obj]
const characterRemapper = {
  source: 'áàãâéèêíìóòõôúùç',
  target: 'aaaaeeeiioooouuc'
}

function toNeutralRegex(text) {
  let accented = []
  let currentNeutral = characterRemapper.target[0]
  for (let i = 0; i <= characterRemapper.source.length; i++) {
    if (characterRemapper.target[i] !== currentNeutral || i === characterRemapper.source.length) {
      const characterGroup = `[${accented.concat(currentNeutral).join('')}]`
      text = text.replaceAll(
        new RegExp(characterGroup, 'gi'),
        characterGroup
      )
      accented = []
      currentNeutral = characterRemapper.target[i]
    }
    accented.push(characterRemapper.source[i])
  }
  return text
}

module.exports = function({
  insertStyles = true,
  keys: {
    show: showKey = 'ctrl-f',
    dismiss: dismissKey = 'escape',
    trigger: triggerKey = 'enter',
    next: nextKey = 'tab',
    previous: previousKey = 'shift-tab'
  } = {},
  text: {
    searchHere: textSearchHere = 'Search here...',
    instructions: textInstructions = 'Instructions',
    openSearch: textOpenSearch = 'Open search',
    closeSearch: textCloseSearch = 'Close search',
    search: textSearch = 'Search',
    nextResult: textNextResult = 'Next result',
    previousResult: textPreviousResult = 'Previous result'
  } = {}
} = {}) { 
  
  showKey = makeArray(showKey)
  dismissKey = makeArray(dismissKey)
  triggerKey = makeArray(triggerKey)
  nextKey = makeArray(nextKey)
  previousKey = makeArray(previousKey)
  
  return function(deck) {
    const cachedSlidesText = deck.slides.map((slide, i) => ({i: i, text: slide.textContent}))
    let searchParentEl
    let searchEl
    let searchInputEl
    let searchResultsCountEl
    let searchInfoEl
    let currentResultIndex
    let activeSearchPattern = ''
    let results = []

    function clearResults() {
      let parentsOfResults = new Set()

      results.forEach(r => {
        let originalContent = document.createTextNode(r.el.textContent)
        parentsOfResults.add(r.el.parentNode)
        r.el.parentNode.replaceChild(originalContent, r.el)
      })
      parentsOfResults.forEach(p => p.normalize())
      searchResultsCountEl.innerHTML = ''
      activeSearchPattern = ''

      results = []
    }

    function show(e) {
      e.preventDefault()
      searchParentEl.classList.add('bespoke-search-searching')
      searchEl.classList.remove('bespoke-search-no-result')
      searchInputEl.focus()
      keymage.pushScope('searching')
      deck.parent.classList.add('bespoke-bullets-off')
    }

    function hide(e) {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      searchInputEl.value = ''
      searchParentEl.classList.remove('bespoke-search-searching')
      searchEl.classList.remove('bespoke-search-no-result')
      keymage.popScope()
      clearResults()
      deck.parent.classList.remove('bespoke-bullets-off')
      searchInputEl.blur()
      deck.parent.focus()
    }

    function reportResultStats() {
      const noResults = results.length === 0
      searchResultsCountEl.innerHTML = noResults ? '' :
        `${currentResultIndex + 1}/${results.length}`
      searchEl.classList.toggle('bespoke-search-no-result', noResults)
      searchEl.classList.toggle('bespoke-search-shaking', noResults)
      searchEl.onanimationend = () => {
        searchEl.classList.remove('bespoke-search-shaking')
        searchEl.onanimationend = null
      }
    }

    function focusAtResult(index) {
      let result = results[index] || {},
        prevResult = results[currentResultIndex] || {},
        slideIndexOfResult = (result).slideIndex
      deck.slide(slideIndexOfResult)

      if (prevResult && prevResult.el) {
        prevResult.el.classList.remove('bespoke-search-result-focused')
      }
      if (result && result.el) {
        result.el.classList.add('bespoke-search-result-focused')
      }

      currentResultIndex = index
      reportResultStats()
    }

    function navigateResult(direction) {
      let newIndex = (currentResultIndex + direction + results.length) % results.length
      focusAtResult(newIndex)
    }

    function search() {
      let searchPattern = toNeutralRegex(searchInputEl.value.trim())
      if (searchPattern === '') {
        clearResults()
        return
      }
      if (searchPattern === activeSearchPattern) {
        navigateResult(+1)
        return
      }
      clearResults()
      activeSearchPattern = searchPattern

      const searchRegex = new RegExp(searchPattern, 'i')
      const matchedSlides = cachedSlidesText.filter(slide => searchRegex.test(slide.text))


      function searchElement(el, visitFunction) {
        let partialResults = []

        switch (el.nodeType) {
        case Node.TEXT_NODE:
          if (searchRegex.test(el.data)) {
            partialResults = visitFunction(el)
          }
          break
        case Node.ELEMENT_NODE:
          for (let child of Array.from(el.childNodes)) {
            partialResults.push(...searchElement(child, visitFunction))
          }
          break
        }

        return partialResults
      }

      function markResult(textNode) {
        const parent = textNode.parentNode
        const fragment = (function(){
          const wrap = document.createElement('div')
          const frag = document.createDocumentFragment()
          wrap.innerHTML = textNode.data
            .replace(/</g, '&#60;')
            .replace(/>/g, '&#62;')
            .replace(new RegExp(`(${searchPattern})`, 'gi'), '<span class="bespoke-search-result">$1</span>')
          while (wrap.firstChild) {
            frag.appendChild(wrap.firstChild)
          }
          return frag
        })()

        const inserted = fragment.querySelectorAll('.bespoke-search-result')
        parent.insertBefore(fragment, textNode)
        parent.removeChild(textNode)

        // returns an array with the newly created elements
        return Array.from(inserted)
      }

      // find occurrences
      results = matchedSlides.reduce((previous, curr) => {
        const slideEl = deck.slides[curr.i]
        const occurrences = searchElement(slideEl, markResult).map(result => ({ slideIndex: curr.i, el: result }))

        return previous.concat(occurrences)
      }, [])

      // report the number of occurrences
      searchResultsCountEl.innerHTML = `1/${results.length}`

      // moves to the slide of the first occurrence
      focusAtResult(0)
    }

    function createSearchBox() {
      searchParentEl = document.createElement('div')
      searchEl = document.createElement('div')
      searchInputEl = document.createElement('input')
      searchResultsCountEl = document.createElement('span')
      searchInfoEl = document.createElement('details')

      searchParentEl.id = 'bespoke-search-parent'
      searchEl.id = 'bespoke-search'
      searchInputEl.id = 'bespoke-search-input'
      searchInputEl.type = 'search'
      searchInputEl.placeholder = textSearchHere
      searchResultsCountEl.id = 'bespoke-search-results-count'
      searchResultsCountEl.innerHTML = ''
      searchInfoEl.id = 'bespoke-search-info'
      searchInfoEl.innerHTML = `
          <summary>${textInstructions}</summary>
          <span class="bespoke-search-info-pair">${showKey.map(k => `<kbd>${k}</kbd>`).join('')} ${textOpenSearch}</span>
          <span class="bespoke-search-info-pair">${dismissKey.map(k => `<kbd>${k}</kbd>`).join('')} ${textCloseSearch}</span>
          <span class="bespoke-search-info-pair">${triggerKey.map(k => `<kbd>${k}</kbd>`).join('')} ${textSearch}</span>
          <span class="bespoke-search-info-pair">${nextKey.map(k => `<kbd>${k}</kbd>`).join('')} ${textNextResult}</span>
          <span class="bespoke-search-info-pair">${previousKey.map(k => `<kbd>${k}</kbd>`).join('')} ${textPreviousResult}</span>
        `
      searchEl.appendChild(searchInputEl)
      searchEl.appendChild(searchResultsCountEl)
      searchEl.appendChild(searchInfoEl)
      searchParentEl.appendChild(searchEl)

      deck.parent.appendChild(searchParentEl)
    }


    showKey.forEach(key => keymage(key, show))
    dismissKey.forEach(key => keymage('searching', key, hide))
    triggerKey.forEach(key => keymage('searching', key, search))
    nextKey.forEach(key => keymage('searching', key, navigateResult.bind(key, +1), {preventDefault: true}))
    previousKey.forEach(key => keymage('searching', key, navigateResult.bind(key, -1), {preventDefault: true}))

    createSearchBox()

    if (insertStyles) {
      _dereq_('../lib/bespoke-search.css')
    }
  }
}

},{"../lib/bespoke-search.css":1,"keymage":4}],3:[function(_dereq_,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],4:[function(_dereq_,module,exports){
/// keymage.js - Javascript keyboard bindings handling
/// http://github.com/piranha/keymage
///
/// (c) 2012-2016 Alexander Solovyov under terms of ISC License

(function(define, undefined) {
define(function() {
    var VERSION = '1.1.3';
    var isOsx = typeof navigator !== 'undefined' &&
        ~navigator.userAgent.indexOf('Mac OS X');

    // Defining all keys
    var MODPROPS = ['shiftKey', 'ctrlKey', 'altKey', 'metaKey'];
    var MODS = {
        'shift': 'shift',
        'ctrl': 'ctrl', 'control': 'ctrl',
        'alt': 'alt', 'option': 'alt',
        'win': 'meta', 'cmd': 'meta', 'super': 'meta',
                          'meta': 'meta',
        // default modifier for os x is cmd and for others is ctrl
        'defmod':  isOsx ? 'meta' : 'ctrl'
        };
    var MODORDER = ['shift', 'ctrl', 'alt', 'meta'];
    var MODNUMS = [16, 17, 18, 91];

    var KEYS = {
        'backspace': 8,
        'tab': 9,
        'enter': 13, 'return': 13,
        'pause': 19,
        'caps': 20, 'capslock': 20,
        'escape': 27, 'esc': 27,
        'space': 32,
        'pgup': 33, 'pageup': 33,
        'pgdown': 34, 'pagedown': 34,
        'end': 35,
        'home': 36,
        'ins': 45, 'insert': 45,
        'del': 46, 'delete': 46,

        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,

        '*': 106,
        '+': 107, 'plus': 107,
        'minus': 109,
        ';': 186,
        '=': 187,
        ',': 188,
        '-': 189,
        '.': 190,
        '/': 191,
        '`': 192,
        '[': 219,
        '\\': 220,
        ']': 221,
        "'": 222
    };

    var i;
    // numpad
    for (i = 0; i < 10; i++) {
        KEYS['num-' + i] = i + 95;
    }
    // top row 0-9
    for (i = 0; i < 10; i++) {
        KEYS[i.toString()] = i + 48;
    }
    // f1-f24
    for (i = 1; i < 25; i++) {
        KEYS['f' + i] = i + 111;
    }
    // alphabet
    for (i = 65; i < 91; i++) {
        KEYS[String.fromCharCode(i).toLowerCase()] = i;
    }

    // Reverse key codes
    var KEYREV = {};
    for (var k in KEYS) {
        var val = KEYS[k];
        if (!KEYREV[val] || KEYREV[val].length < k.length) {
            KEYREV[val] = k;
        }
    }

    // -----------------------
    // Actual work is done here

    var currentScope = '';
    var allChains = {};

    function parseKeyString(keystring) {
        var bits = keystring.split(/-(?!$)/);
        var button = bits[bits.length - 1];
        var key = {code: KEYS[button]};

        if (!key.code) {
            throw 'Unknown key "' + button + '" in keystring "' +
                keystring + '"';
        }

        var mod;
        for (var i = 0; i < bits.length - 1; i++) {
            button = bits[i];
            mod = MODS[button];
            if (!mod) {
                    throw 'Unknown modifier "' + button + '" in keystring "' +
                        keystring + '"';
            }
            key[mod] = true;
        }

        return key;
    }

    function stringifyKey(key) {
        var s = '';
        for (var i = 0; i < MODORDER.length; i++) {
            if (key[MODORDER[i]]) {
                s += MODORDER[i] + '-';
            }
        }
        s += KEYREV[key.code];
        return s;
    }

    function normalizeKeyChain(keychainString) {
        var keychain = [];
        var keys = keychainString.split(' ');

        for (var i = 0; i < keys.length; i++) {
            var key = parseKeyString(keys[i]);
            key = stringifyKey(key);
            keychain.push(key);
        }

        keychain.original = keychainString;
        return keychain;
    }

    function eventKeyString(e) {
        var key = {code: e.keyCode};
        for (var i = 0; i < MODPROPS.length; i++) {
            var mod = MODPROPS[i];
            if (e[mod]) {
                key[mod.slice(0, mod.length - 3)] = true;
            }
        }
        return stringifyKey(key);
    }

    function getNestedChains(chains, scope) {
        for (var i = 0; i < scope.length; i++) {
            var bit = scope[i];

            if (bit) {
                chains = chains[bit];
            }

            if (!chains) {
                break;
            }
        }
        return chains;
    }

    var sequence = [];
    function dispatch(e) {
        // Skip all modifiers
        if (~MODNUMS.indexOf(e.keyCode)) {
            return;
        }

        var seq = sequence.slice();
        seq.push(eventKeyString(e));
        var scope = currentScope.split('.');
        var matched, chains, key;

        for (var i = scope.length; i >= 0; i--) {
            chains = getNestedChains(allChains, scope.slice(0, i));
            if (!chains) {
                continue;
            }
            matched = true;
            for (var j = 0; j < seq.length; j++) {
                key = seq[j];
                if (!chains[key]) {
                    matched = false;
                    break;
                }
                chains = chains[key];
            }

            if (matched) {
                break;
            }
        }

        var definitionScope = scope.slice(0, i).join('.');
        var preventDefault = chains.preventDefault;

        // partial match, save the sequence
        if (matched && !chains.handlers) {
            sequence = seq;
            if (preventDefault) {
                e.preventDefault();
            }
            return;
        }

        if (matched) {
            for (i = 0; i < chains.handlers.length; i++) {
                var handler = chains.handlers[i];
                var options = handler._keymage;

                var res = handler.call(options.context, e, {
                    shortcut: options.original,
                    scope: currentScope,
                    definitionScope: definitionScope
                });

                if (res === false || preventDefault) {
                    e.preventDefault();
                }
            }
        }

        // either matched or not, drop the sequence
        sequence = [];
    }

    function getHandlers(scope, keychain, fn) {
        var bits = scope.split('.');
        var chains = allChains;
        bits = bits.concat(keychain);

        for (var i = 0, l = bits.length; i < l; i++) {
            var bit = bits[i];
            if (!bit) continue;

            chains = chains[bit] || (chains[bit] = {});
            if (fn && fn._keymage.preventDefault) {
                chains.preventDefault = true;
            }

            if (i === l - 1) {
                var handlers = chains.handlers || (chains.handlers = []);
                return handlers;
            }
        }
    }

    function assignKey(scope, keychain, fn) {
        var handlers = getHandlers(scope, keychain, fn);
        handlers.push(fn);
    }

    function unassignKey(scope, keychain, fn) {
        var handlers = getHandlers(scope, keychain);
        var idx = handlers.indexOf(fn);
        if (~idx) {
            handlers.splice(idx, 1);
        }
    }

    function parsed(scope, keychain, fn, options) {
        if (keychain === undefined && fn === undefined) {
            return function(keychain, fn) {
                return keymage(scope, keychain, fn);
            };
        }

        if (typeof keychain === 'function') {
            options = fn;
            fn = keychain;
            keychain = scope;
            scope = '';
        }

        var normalized = normalizeKeyChain(keychain);

        return [scope, normalized, fn, options];
    }

    // optional arguments: scope, options.
    function keymage(scope, keychain, fn, options) {
        var args = parsed(scope, keychain, fn, options);
        fn = args[2];
        options = args[3];
        fn._keymage = options || {};
        fn._keymage.original = keychain;
        assignKey.apply(null, args);

        return function () {
            unassignKey.apply(null, args);
        };
    }

    keymage.unbind = function(scope, keychain, fn) {
        var args = parsed(scope, keychain, fn);
        unassignKey.apply(null, args);
    };

    keymage.parse = parseKeyString;
    keymage.stringify = stringifyKey;

    keymage.bindings = allChains;

    keymage.setScope = function(scope) {
        currentScope = scope ? scope : '';
    };

    keymage.getScope = function() { return currentScope; };

    keymage.pushScope = function(scope) {
        currentScope = (currentScope ? currentScope + '.' : '') + scope;
        return currentScope;
    };

    keymage.popScope = function(scope) {
        var i;

        if (!scope) {
            i = currentScope.lastIndexOf('.');
            scope = currentScope.slice(i + 1);
            currentScope = i == -1 ? '' : currentScope.slice(0, i);
            return scope;
        }

        currentScope = currentScope.replace(
            new RegExp('(^|\\.)' + scope + '(\\.|$).*'), '');
        return scope;
    };

    keymage.version = VERSION;

    window.addEventListener('keydown', dispatch, false);

    return keymage;
});
})(typeof define !== 'undefined' ? define : function(factory) {
    if (typeof module !== 'undefined') {
        module.exports = factory();
    } else {
        window.keymage = factory();
    }
});

},{}]},{},[2])(2)
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
module.exports = function(options) {
  return function(deck) {
    var activeSlideIndex,
      activeBulletIndex,

      bullets = deck.slides.map(function(slide) {
        return [].slice.call(slide.querySelectorAll((typeof options === 'string' ? options : '[data-bespoke-bullet]')), 0);
      }),

      next = function() {
        var nextSlideIndex = activeSlideIndex + 1;

        if (activeSlideHasBulletByOffset(1)) {
          activateBullet(activeSlideIndex, activeBulletIndex + 1);
          return false;
        } else if (bullets[nextSlideIndex]) {
          activateBullet(nextSlideIndex, 0);
        }
      },

      prev = function() {
        var prevSlideIndex = activeSlideIndex - 1;

        if (activeSlideHasBulletByOffset(-1)) {
          activateBullet(activeSlideIndex, activeBulletIndex - 1);
          return false;
        } else if (bullets[prevSlideIndex]) {
          activateBullet(prevSlideIndex, bullets[prevSlideIndex].length - 1);
        }
      },

      activateBullet = function(slideIndex, bulletIndex) {
        activeSlideIndex = slideIndex;
        activeBulletIndex = bulletIndex;

        bullets.forEach(function(slide, s) {
          slide.forEach(function(bullet, b) {
            bullet.classList.add('bespoke-bullet');

            if (s < slideIndex || s === slideIndex && b <= bulletIndex) {
              bullet.classList.add('bespoke-bullet-active');
              bullet.classList.remove('bespoke-bullet-inactive');
            } else {
              bullet.classList.add('bespoke-bullet-inactive');
              bullet.classList.remove('bespoke-bullet-active');
            }

            if (s === slideIndex && b === bulletIndex) {
              bullet.classList.add('bespoke-bullet-current');
            } else {
              bullet.classList.remove('bespoke-bullet-current');
            }
          });
        });
      },

      activeSlideHasBulletByOffset = function(offset) {
        return bullets[activeSlideIndex][activeBulletIndex + offset] !== undefined;
      };

    deck.on('next', next);
    deck.on('prev', prev);

    deck.on('slide', function(e) {
      activateBullet(e.index, 0);
    });

    activateBullet(0, 0);
  };
};

},{}],4:[function(require,module,exports){
module.exports = function() {
  return function(deck) {
    var addClass = function(el, cls) {
        el.classList.add('bespoke-' + cls);
      },

      removeClass = function(el, cls) {
        el.className = el.className
          .replace(new RegExp('bespoke-' + cls +'(\\s|$)', 'g'), ' ')
          .trim();
      },

      deactivate = function(el, index) {
        var activeSlide = deck.slides[deck.slide()],
          offset = index - deck.slide(),
          offsetClass = offset > 0 ? 'after' : 'before';

        ['before(-\\d+)?', 'after(-\\d+)?', 'active', 'inactive'].map(removeClass.bind(null, el));

        if (el !== activeSlide) {
          ['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(null, el));
        }
      };

    addClass(deck.parent, 'parent');
    deck.slides.map(function(el) { addClass(el, 'slide'); });

    deck.on('activate', function(e) {
      deck.slides.map(deactivate);
      addClass(e.slide, 'active');
      removeClass(e.slide, 'inactive');
    });
  };
};

},{}],5:[function(require,module,exports){
module.exports = function(options) {
  return function(deck) {
    var isHorizontal = options !== 'vertical';

    document.addEventListener('keydown', function(e) {
      if (e.which == 34 || // PAGE DOWN
        (e.which == 32 && !e.shiftKey) || // SPACE WITHOUT SHIFT
        (isHorizontal && e.which == 39) || // RIGHT
        (!isHorizontal && e.which == 40) // DOWN
      ) { deck.next(); }

      if (e.which == 33 || // PAGE UP
        (e.which == 32 && e.shiftKey) || // SPACE + SHIFT
        (isHorizontal && e.which == 37) || // LEFT
        (!isHorizontal && e.which == 38) // UP
      ) { deck.prev(); }
    });
  };
};

},{}],6:[function(require,module,exports){
module.exports = function(options) {
  return function(deck) {
    var parent = deck.parent,
      firstSlide = deck.slides[0],
      slideHeight = firstSlide.offsetHeight,
      slideWidth = firstSlide.offsetWidth,
      useZoom = options === 'zoom' || ('zoom' in parent.style && options !== 'transform'),

      innerWrap = function(element) {
        var innerWrapper = document.createElement('div');
        innerWrapper.className = 'bespoke-scale-parent';
        while (element.children.length > 0) {
          innerWrapper.appendChild(element.children[0]);
        }
        element.appendChild(innerWrapper);
        return innerWrapper;
      },

      element = useZoom ? parent : innerWrap(parent),

      transformProperty = (function(property) {
        var prefixes = 'Moz Webkit O ms'.split(' ');
        return prefixes.reduce(function(currentProperty, prefix) {
            return prefix + property in parent.style ? prefix + property : currentProperty;
          }, property.toLowerCase());
      }('Transform')),

      scale = useZoom ?
        function(ratio, element) {
          element.style.zoom = ratio;
        } :
        function(ratio, element) {
          element.style[transformProperty] = 'scale(' + ratio + ')';
        },

      scaleAll = function() {
        var xScale = parent.offsetWidth / slideWidth,
          yScale = (parent.offsetHeight / slideHeight) || 0;

        scale(Math.min(xScale, yScale), element);
      };

    window.addEventListener('resize', scaleAll);
    scaleAll();
  };

};

},{}],7:[function(require,module,exports){
(function (global){(function (){
/*!
 * bespoke-theme-cube v2.0.1
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self);var f=o;f=f.bespoke||(f.bespoke={}),f=f.themes||(f.themes={}),f.cube=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

var classes = _dereq_('bespoke-classes');
var insertCss = _dereq_('insert-css');

module.exports = function() {
  var css = "*{-moz-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}@media print{*{-webkit-print-color-adjust:exact}}@page{size:landscape;margin:0}.bespoke-parent{-webkit-transition:background .6s ease;transition:background .6s ease;position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden}@media print{.bespoke-parent{overflow:visible;position:static}}.bespoke-theme-cube-slide-parent{position:absolute;top:0;left:0;right:0;bottom:0;-webkit-perspective:600px;perspective:600px;pointer-events:none}.bespoke-slide{pointer-events:auto;-webkit-transition:-webkit-transform .6s ease,opacity .6s ease,background .6s ease;transition:transform .6s ease,opacity .6s ease,background .6s ease;-webkit-transform-origin:50% 50% 0;transform-origin:50% 50% 0;-webkit-backface-visibility:hidden;backface-visibility:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center;width:640px;height:480px;position:absolute;top:50%;margin-top:-240px;left:50%;margin-left:-320px;background:#eaeaea;padding:40px;border-radius:0}@media print{.bespoke-slide{zoom:1!important;height:743px;width:100%;page-break-before:always;position:static;margin:0;-webkit-transition:none;transition:none}}.bespoke-before{-webkit-transform:translateX(100px)translateX(-320px)rotateY(-90deg)translateX(-320px);transform:translateX(100px)translateX(-320px)rotateY(-90deg)translateX(-320px)}@media print{.bespoke-before{-webkit-transform:none;transform:none}}.bespoke-after{-webkit-transform:translateX(-100px)translateX(320px)rotateY(90deg)translateX(320px);transform:translateX(-100px)translateX(320px)rotateY(90deg)translateX(320px)}@media print{.bespoke-after{-webkit-transform:none;transform:none}}.bespoke-inactive{opacity:0;pointer-events:none}@media print{.bespoke-inactive{opacity:1}}.bespoke-active{opacity:1}.bespoke-bullet{-webkit-transition:all .3s ease;transition:all .3s ease}@media print{.bespoke-bullet{-webkit-transition:none;transition:none}}.bespoke-bullet-inactive{opacity:0}li.bespoke-bullet-inactive{-webkit-transform:translateX(16px);transform:translateX(16px)}@media print{li.bespoke-bullet-inactive{-webkit-transform:none;transform:none}}@media print{.bespoke-bullet-inactive{opacity:1}}.bespoke-bullet-active{opacity:1}.bespoke-scale-parent{-webkit-perspective:600px;perspective:600px;position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.bespoke-scale-parent .bespoke-active{pointer-events:auto}@media print{.bespoke-scale-parent{-webkit-transform:none!important;transform:none!important}}.bespoke-progress-parent{position:absolute;top:0;left:0;right:0;height:2px}@media only screen and (min-width:1366px){.bespoke-progress-parent{height:4px}}@media print{.bespoke-progress-parent{display:none}}.bespoke-progress-bar{-webkit-transition:width .6s ease;transition:width .6s ease;position:absolute;height:100%;background:#0089f3;border-radius:0 4px 4px 0}.emphatic{background:#eaeaea}.bespoke-backdrop{position:absolute;top:0;left:0;right:0;bottom:0;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:opacity .6s ease;transition:opacity .6s ease;opacity:0;z-index:-1}.bespoke-backdrop-active{opacity:1}pre{padding:26px!important;border-radius:8px}body{font-family:helvetica,arial,sans-serif;font-size:18px;color:#404040}h1{font-size:72px;line-height:82px;letter-spacing:-2px;margin-bottom:16px}h2{font-size:42px;letter-spacing:-1px;margin-bottom:8px}h3{font-size:24px;font-weight:400;margin-bottom:24px;color:#606060}hr{visibility:hidden;height:20px}ul{list-style:none}li{margin-bottom:12px}p{margin:0 100px 12px;line-height:22px}a{color:#0089f3;text-decoration:none}";
  insertCss(css, { prepend: true });

  return function(deck) {
    classes()(deck);

    var wrap = function(element) {
      var wrapper = document.createElement('div');
      wrapper.className = 'bespoke-theme-cube-slide-parent';
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
    };

    deck.slides.forEach(wrap);
  };
};

},{"bespoke-classes":2,"insert-css":3}],2:[function(_dereq_,module,exports){
module.exports = function() {
  return function(deck) {
    var addClass = function(el, cls) {
        el.classList.add('bespoke-' + cls);
      },

      removeClass = function(el, cls) {
        el.className = el.className
          .replace(new RegExp('bespoke-' + cls +'(\\s|$)', 'g'), ' ')
          .trim();
      },

      deactivate = function(el, index) {
        var activeSlide = deck.slides[deck.slide()],
          offset = index - deck.slide(),
          offsetClass = offset > 0 ? 'after' : 'before';

        ['before(-\\d+)?', 'after(-\\d+)?', 'active', 'inactive'].map(removeClass.bind(null, el));

        if (el !== activeSlide) {
          ['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(null, el));
        }
      };

    addClass(deck.parent, 'parent');
    deck.slides.map(function(el) { addClass(el, 'slide'); });

    deck.on('activate', function(e) {
      deck.slides.map(deactivate);
      addClass(e.slide, 'active');
      removeClass(e.slide, 'inactive');
    });
  };
};

},{}],3:[function(_dereq_,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}]},{},[1])
(1)
});
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
module.exports = function(options) {
  return function(deck) {
    var axis = options == 'vertical' ? 'Y' : 'X',
      startPosition,
      delta;

    deck.parent.addEventListener('touchstart', function(e) {
      if (e.touches.length == 1) {
        startPosition = e.touches[0]['page' + axis];
        delta = 0;
      }
    });

    deck.parent.addEventListener('touchmove', function(e) {
      if (e.touches.length == 1) {
        e.preventDefault();
        delta = e.touches[0]['page' + axis] - startPosition;
      }
    });

    deck.parent.addEventListener('touchend', function() {
      if (Math.abs(delta) > 50) {
        deck[delta > 0 ? 'prev' : 'next']();
      }
    });
  };
};

},{}],9:[function(require,module,exports){
var from = function(opts, plugins) {
  var parent = (opts.parent || opts).nodeType === 1 ? (opts.parent || opts) : document.querySelector(opts.parent || opts),
    slides = [].filter.call(typeof opts.slides === 'string' ? parent.querySelectorAll(opts.slides) : (opts.slides || parent.children), function(el) { return el.nodeName !== 'SCRIPT'; }),
    activeSlide = slides[0],
    listeners = {},

    activate = function(index, customData) {
      if (!slides[index]) {
        return;
      }

      fire('deactivate', createEventData(activeSlide, customData));
      activeSlide = slides[index];
      fire('activate', createEventData(activeSlide, customData));
    },

    slide = function(index, customData) {
      if (arguments.length) {
        fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
      } else {
        return slides.indexOf(activeSlide);
      }
    },

    step = function(offset, customData) {
      var slideIndex = slides.indexOf(activeSlide) + offset;

      fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
    },

    on = function(eventName, callback) {
      (listeners[eventName] || (listeners[eventName] = [])).push(callback);
      return off.bind(null, eventName, callback);
    },

    off = function(eventName, callback) {
      listeners[eventName] = (listeners[eventName] || []).filter(function(listener) { return listener !== callback; });
    },

    fire = function(eventName, eventData) {
      return (listeners[eventName] || [])
        .reduce(function(notCancelled, callback) {
          return notCancelled && callback(eventData) !== false;
        }, true);
    },

    createEventData = function(el, eventData) {
      eventData = eventData || {};
      eventData.index = slides.indexOf(el);
      eventData.slide = el;
      return eventData;
    },

    deck = {
      on: on,
      off: off,
      fire: fire,
      slide: slide,
      next: step.bind(null, 1),
      prev: step.bind(null, -1),
      parent: parent,
      slides: slides
    };

  (plugins || []).forEach(function(plugin) {
    plugin(deck);
  });

  activate(0);

  return deck;
};

module.exports = {
  from: from
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2RlbW8uanMiLCJkaXN0L2Jlc3Bva2Utc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL2Jlc3Bva2UtYnVsbGV0cy9saWIvYmVzcG9rZS1idWxsZXRzLmpzIiwibm9kZV9tb2R1bGVzL2Jlc3Bva2UtY2xhc3Nlcy9saWIvYmVzcG9rZS1jbGFzc2VzLmpzIiwibm9kZV9tb2R1bGVzL2Jlc3Bva2Uta2V5cy9saWIvYmVzcG9rZS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2Jlc3Bva2Utc2NhbGUvbGliL2Jlc3Bva2Utc2NhbGUuanMiLCJub2RlX21vZHVsZXMvYmVzcG9rZS10aGVtZS1jdWJlL2Rpc3QvYmVzcG9rZS10aGVtZS1jdWJlLmpzIiwibm9kZV9tb2R1bGVzL2Jlc3Bva2UtdG91Y2gvbGliL2Jlc3Bva2UtdG91Y2guanMiLCJub2RlX21vZHVsZXMvYmVzcG9rZS9saWIvYmVzcG9rZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4ckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYmVzcG9rZSA9IHJlcXVpcmUoJ2Jlc3Bva2UnKVxyXG5jb25zdCBrZXlzID0gcmVxdWlyZSgnYmVzcG9rZS1rZXlzJylcclxuY29uc3QgdG91Y2ggPSByZXF1aXJlKCdiZXNwb2tlLXRvdWNoJylcclxuY29uc3Qgc2NhbGUgPSByZXF1aXJlKCdiZXNwb2tlLXNjYWxlJylcclxuY29uc3QgYnVsbGV0cyA9IHJlcXVpcmUoJ2Jlc3Bva2UtYnVsbGV0cycpXHJcbmNvbnN0IHRoZW1lID0gcmVxdWlyZSgnYmVzcG9rZS10aGVtZS1jdWJlJylcclxuY29uc3QgY2xhc3NlcyA9IHJlcXVpcmUoJ2Jlc3Bva2UtY2xhc3NlcycpXHJcbmNvbnN0IHNlYXJjaCA9IHJlcXVpcmUoJy4uL2Rpc3QvYmVzcG9rZS1zZWFyY2guanMnKVxyXG5cclxuYmVzcG9rZS5mcm9tKCdhcnRpY2xlJywgW1xyXG4gIGtleXMoKSxcclxuICB0b3VjaCgpLFxyXG4gIHRoZW1lKCksXHJcbiAgc2NhbGUoJ3RyYW5zZm9ybScpLFxyXG4gIGJ1bGxldHMoJy5idWxsZXRlZCA+IConKSxcclxuICBjbGFzc2VzKCksXHJcbiAgc2VhcmNoKClcclxuXSlcclxuIiwiLyohXG4gKiBiZXNwb2tlLXNlYXJjaCB2MS4wLjBcbiAqXG4gKiBDb3B5cmlnaHQgMjAyMSwgRmzDoXZpb1xuICogVGhpcyBjb250ZW50IGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nPShnLmJlc3Bva2V8fChnLmJlc3Bva2UgPSB7fSkpO2c9KGcucGx1Z2luc3x8KGcucGx1Z2lucyA9IHt9KSk7Zy5zZWFyY2ggPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBjc3MgPSBcIjpyb290ey0tc2VhcmNoLXJlc3VsdC1iZzp5ZWxsb3c7LS1zZWFyY2gtcmVzdWx0LWZvY3VzZWQtYmc6b3JhbmdlfSNiZXNwb2tlLXNlYXJjaC1wYXJlbnR7LS1zZWFyY2gtcGFyZW50LWJnOiMwMDA2Oy0tc2VhcmNoLW1hcmdpbjowLjVlbTstLXNlYXJjaC1iZzojZmZmMzstLXNlYXJjaC1pbnB1dC1sZW5ndGg6MTJlbTstLXNlYXJjaC1pbnB1dC1wb3NpdGlvbjpmbGV4LWVuZDstLXNlYXJjaC1pbnB1dC1jb2xvcjojMzMzOy0tc2VhcmNoLWluZm8tY29sb3I6IzMzMzstLXNlYXJjaC1pbmZvLWtiZC1jb2xvcjojMDAwOy0tc2VhcmNoLWluZm8ta2JkLWJnOiNjY2M7LS1zZWFyY2gtbm8tcmVzdWx0LWNvbG9yOiM4YjAwMDA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6dmFyKC0tc2VhcmNoLWlucHV0LXBvc2l0aW9uKTthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5OjA7dHJhbnNpdGlvbjphbGwgLjJzIGVhc2U7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1zZWFyY2gtcGFyZW50LWJnKTtmb250LXNpemU6MS4yNXJlbTtwZXJzcGVjdGl2ZTo5MDBweH0jYmVzcG9rZS1zZWFyY2gtcGFyZW50LmJlc3Bva2Utc2VhcmNoLXNlYXJjaGluZ3tvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YXV0bzt6LWluZGV4OjEwMDB9I2Jlc3Bva2Utc2VhcmNoe2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6YmFzZWxpbmU7bWFyZ2luOnZhcigtLXNlYXJjaC1tYXJnaW4pO3BhZGRpbmc6MWVtO2JvcmRlci1yYWRpdXM6MTBweDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O3dpZHRoOmNhbGModmFyKC0tc2VhcmNoLWlucHV0LWxlbmd0aCkgKyA1ZW0pO2JhY2tncm91bmQtY29sb3I6dmFyKC0tc2VhcmNoLWJnKTtiYWNrZHJvcC1maWx0ZXI6Ymx1cig2cHgpO3RyYW5zaXRpb246YWxsIC4zcyBjdWJpYy1iZXppZXIoLjA2LC45OSwuNDYsMS4xNik7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTYwcHgpIHJvdGF0ZVgoOTBkZWcpO29wYWNpdHk6MH0jYmVzcG9rZS1zZWFyY2gtcmVzdWx0cy1jb3VudHtmb250LXNpemU6Ljc1ZW07Zm9udC1mYW1pbHk6bW9ub3NwYWNlfS5iZXNwb2tlLXNlYXJjaC1uby1yZXN1bHQ+I2Jlc3Bva2Utc2VhcmNoLWlucHV0e291dGxpbmU6MXB4IHNvbGlkIGN1cnJlbnRDb2xvcjtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tc2VhcmNoLW5vLXJlc3VsdC1jb2xvcil9LmJlc3Bva2Utc2VhcmNoLXJlc3VsdHtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXNlYXJjaC1yZXN1bHQtYmcsI2ZmMCl9LmJlc3Bva2Utc2VhcmNoLXJlc3VsdC1mb2N1c2Vke2JhY2tncm91bmQtY29sb3I6dmFyKC0tc2VhcmNoLXJlc3VsdC1mb2N1c2VkLWJnLG9yYW5nZSl9I2Jlc3Bva2Utc2VhcmNoLWlucHV0e3dpZHRoOnZhcigtLXNlYXJjaC1pbnB1dC1sZW5ndGgpO3BhZGRpbmc6LjI1ZW0gLjQ1ZW07Ym9yZGVyOjFweCBzb2xpZCBjdXJyZW50Q29sb3I7Ym9yZGVyLXJhZGl1czo1cHg7Y29sb3I6dmFyKC0tc2VhcmNoLWlucHV0LWNvbG9yKTtmb250LXNpemU6MWVtfS5iZXNwb2tlLXNlYXJjaC1zZWFyY2hpbmcgI2Jlc3Bva2Utc2VhcmNoe3RyYW5zZm9ybTpzY2FsZSgxKTtvcGFjaXR5OjF9I2Jlc3Bva2Utc2VhcmNoLWluZm97d2lkdGg6MTAwJTttYXJnaW4tdG9wOjFlbTtmb250LXNpemU6LjdlbTt0ZXh0LWFsaWduOmxlZnQ7Y29sb3I6dmFyKC0tc2VhcmNoLWluZm8tY29sb3IpfS5iZXNwb2tlLXNlYXJjaC1pbmZvLXBhaXJ7bWFyZ2luLXJpZ2h0OjFlbTt3aGl0ZS1zcGFjZTpub3dyYXA7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLWJvdHRvbTouMjVlbX0jYmVzcG9rZS1zZWFyY2gtaW5mbyBrYmR7bWFyZ2luOjAgLjFlbTtwYWRkaW5nOi4xZW0gLjZlbTtib3JkZXItcmFkaXVzOjNweDtib3JkZXI6MXB4IHNvbGlkICNjY2M7Y29sb3I6dmFyKC0tc2VhcmNoLWluZm8ta2JkLWNvbG9yKTtsaW5lLWhlaWdodDoxLjQ7Zm9udC1zaXplOi43ZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym94LXNoYWRvdzowIDFweCAwICMwMDA5LGluc2V0IDAgMCAwIDJweCAjY2NjO2JhY2tncm91bmQtY29sb3I6dmFyKC0tc2VhcmNoLWluZm8ta2JkLWJnKX0jYmVzcG9rZS1zZWFyY2gtaW5mbyBrYmQ6bGFzdC1vZi10eXBle21hcmdpbi1yaWdodDoxZW19I2Jlc3Bva2Utc2VhcmNoLWluZm8gc3VtbWFyeXtkaXNwbGF5Omxpc3QtaXRlbTtjb3VudGVyLWluY3JlbWVudDpsaXN0LWl0ZW0gMDtsaXN0LXN0eWxlOmluc2lkZSBkaXNjbG9zdXJlLWNsb3NlZDtjdXJzb3I6cG9pbnRlcn0jYmVzcG9rZS1zZWFyY2gtaW5mb1tvcGVuXT5zdW1tYXJ5OmZpcnN0LW9mLXR5cGV7bGlzdC1zdHlsZS10eXBlOmRpc2Nsb3N1cmUtb3Blbn0uYmVzcG9rZS1idWxsZXRzLW9mZiAuYmVzcG9rZS1idWxsZXQuYmVzcG9rZS1idWxsZXQtaW5hY3RpdmV7b3BhY2l0eToxO3RyYW5zZm9ybTpub25lfS5iZXNwb2tlLXNlYXJjaC1zaGFraW5ne2FuaW1hdGlvbjpzaGFraW5nIC41cyBlYXNlLW91dCAwcyAxfUBrZXlmcmFtZXMgc2hha2luZ3swJXt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoNHB4LDAsMCl9MTAle3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtN3B4LC01cHgsMCl9MjAle3RyYW5zZm9ybTp0cmFuc2xhdGUzZCg4cHgsNXB4LDApfTMwJXt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTdweCwzcHgsMCl9NDAle3RyYW5zZm9ybTp0cmFuc2xhdGUzZCg5cHgsLTNweCwwKX01MCV7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC00cHgsM3B4LDApfTYwJXt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoNHB4LC00cHgsMCl9NzAle3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtNXB4LC00cHgsMCl9ODAle3RyYW5zZm9ybTp0cmFuc2xhdGUzZCg0cHgsMnB4LDApfTkwJXt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTNweCwtMXB4LDApfTEwMCV7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKX19QG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTpkYXJrKXsjYmVzcG9rZS1zZWFyY2gtcGFyZW50ey0tc2VhcmNoLXBhcmVudC1iZzojZmZmNjstLXNlYXJjaC1iZzojMDAwMzstLXNlYXJjaC1pbmZvLWNvbG9yOiNlZWV9fVwiOyAoX2RlcmVxXyhcImJyb3dzZXJpZnktY3NzXCIpLmNyZWF0ZVN0eWxlKGNzcywgeyBcImhyZWZcIjogXCJsaWJcXFxcYmVzcG9rZS1zZWFyY2guY3NzXCIgfSwgeyBcImluc2VydEF0XCI6IFwiYm90dG9tXCIgfSkpOyBtb2R1bGUuZXhwb3J0cyA9IGNzcztcbn0se1wiYnJvd3NlcmlmeS1jc3NcIjozfV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5jb25zdCBrZXltYWdlID0gX2RlcmVxXygna2V5bWFnZScpXHJcbmNvbnN0IG1ha2VBcnJheSA9IG9iaiA9PiBBcnJheS5pc0FycmF5KG9iaikgPyBvYmogOiBbb2JqXVxyXG5jb25zdCBjaGFyYWN0ZXJSZW1hcHBlciA9IHtcclxuICBzb3VyY2U6ICfDocOgw6PDosOpw6jDqsOtw6zDs8Oyw7XDtMO6w7nDpycsXHJcbiAgdGFyZ2V0OiAnYWFhYWVlZWlpb29vb3V1YydcclxufVxyXG5cclxuZnVuY3Rpb24gdG9OZXV0cmFsUmVnZXgodGV4dCkge1xyXG4gIGxldCBhY2NlbnRlZCA9IFtdXHJcbiAgbGV0IGN1cnJlbnROZXV0cmFsID0gY2hhcmFjdGVyUmVtYXBwZXIudGFyZ2V0WzBdXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gY2hhcmFjdGVyUmVtYXBwZXIuc291cmNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyUmVtYXBwZXIudGFyZ2V0W2ldICE9PSBjdXJyZW50TmV1dHJhbCB8fCBpID09PSBjaGFyYWN0ZXJSZW1hcHBlci5zb3VyY2UubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGNoYXJhY3Rlckdyb3VwID0gYFske2FjY2VudGVkLmNvbmNhdChjdXJyZW50TmV1dHJhbCkuam9pbignJyl9XWBcclxuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZUFsbChcclxuICAgICAgICBuZXcgUmVnRXhwKGNoYXJhY3Rlckdyb3VwLCAnZ2knKSxcclxuICAgICAgICBjaGFyYWN0ZXJHcm91cFxyXG4gICAgICApXHJcbiAgICAgIGFjY2VudGVkID0gW11cclxuICAgICAgY3VycmVudE5ldXRyYWwgPSBjaGFyYWN0ZXJSZW1hcHBlci50YXJnZXRbaV1cclxuICAgIH1cclxuICAgIGFjY2VudGVkLnB1c2goY2hhcmFjdGVyUmVtYXBwZXIuc291cmNlW2ldKVxyXG4gIH1cclxuICByZXR1cm4gdGV4dFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHtcclxuICBpbnNlcnRTdHlsZXMgPSB0cnVlLFxyXG4gIGtleXM6IHtcclxuICAgIHNob3c6IHNob3dLZXkgPSAnY3RybC1mJyxcclxuICAgIGRpc21pc3M6IGRpc21pc3NLZXkgPSAnZXNjYXBlJyxcclxuICAgIHRyaWdnZXI6IHRyaWdnZXJLZXkgPSAnZW50ZXInLFxyXG4gICAgbmV4dDogbmV4dEtleSA9ICd0YWInLFxyXG4gICAgcHJldmlvdXM6IHByZXZpb3VzS2V5ID0gJ3NoaWZ0LXRhYidcclxuICB9ID0ge30sXHJcbiAgdGV4dDoge1xyXG4gICAgc2VhcmNoSGVyZTogdGV4dFNlYXJjaEhlcmUgPSAnU2VhcmNoIGhlcmUuLi4nLFxyXG4gICAgaW5zdHJ1Y3Rpb25zOiB0ZXh0SW5zdHJ1Y3Rpb25zID0gJ0luc3RydWN0aW9ucycsXHJcbiAgICBvcGVuU2VhcmNoOiB0ZXh0T3BlblNlYXJjaCA9ICdPcGVuIHNlYXJjaCcsXHJcbiAgICBjbG9zZVNlYXJjaDogdGV4dENsb3NlU2VhcmNoID0gJ0Nsb3NlIHNlYXJjaCcsXHJcbiAgICBzZWFyY2g6IHRleHRTZWFyY2ggPSAnU2VhcmNoJyxcclxuICAgIG5leHRSZXN1bHQ6IHRleHROZXh0UmVzdWx0ID0gJ05leHQgcmVzdWx0JyxcclxuICAgIHByZXZpb3VzUmVzdWx0OiB0ZXh0UHJldmlvdXNSZXN1bHQgPSAnUHJldmlvdXMgcmVzdWx0J1xyXG4gIH0gPSB7fVxyXG59ID0ge30pIHsgXHJcbiAgXHJcbiAgc2hvd0tleSA9IG1ha2VBcnJheShzaG93S2V5KVxyXG4gIGRpc21pc3NLZXkgPSBtYWtlQXJyYXkoZGlzbWlzc0tleSlcclxuICB0cmlnZ2VyS2V5ID0gbWFrZUFycmF5KHRyaWdnZXJLZXkpXHJcbiAgbmV4dEtleSA9IG1ha2VBcnJheShuZXh0S2V5KVxyXG4gIHByZXZpb3VzS2V5ID0gbWFrZUFycmF5KHByZXZpb3VzS2V5KVxyXG4gIFxyXG4gIHJldHVybiBmdW5jdGlvbihkZWNrKSB7XHJcbiAgICBjb25zdCBjYWNoZWRTbGlkZXNUZXh0ID0gZGVjay5zbGlkZXMubWFwKChzbGlkZSwgaSkgPT4gKHtpOiBpLCB0ZXh0OiBzbGlkZS50ZXh0Q29udGVudH0pKVxyXG4gICAgbGV0IHNlYXJjaFBhcmVudEVsXHJcbiAgICBsZXQgc2VhcmNoRWxcclxuICAgIGxldCBzZWFyY2hJbnB1dEVsXHJcbiAgICBsZXQgc2VhcmNoUmVzdWx0c0NvdW50RWxcclxuICAgIGxldCBzZWFyY2hJbmZvRWxcclxuICAgIGxldCBjdXJyZW50UmVzdWx0SW5kZXhcclxuICAgIGxldCBhY3RpdmVTZWFyY2hQYXR0ZXJuID0gJydcclxuICAgIGxldCByZXN1bHRzID0gW11cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhclJlc3VsdHMoKSB7XHJcbiAgICAgIGxldCBwYXJlbnRzT2ZSZXN1bHRzID0gbmV3IFNldCgpXHJcblxyXG4gICAgICByZXN1bHRzLmZvckVhY2gociA9PiB7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHIuZWwudGV4dENvbnRlbnQpXHJcbiAgICAgICAgcGFyZW50c09mUmVzdWx0cy5hZGQoci5lbC5wYXJlbnROb2RlKVxyXG4gICAgICAgIHIuZWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob3JpZ2luYWxDb250ZW50LCByLmVsKVxyXG4gICAgICB9KVxyXG4gICAgICBwYXJlbnRzT2ZSZXN1bHRzLmZvckVhY2gocCA9PiBwLm5vcm1hbGl6ZSgpKVxyXG4gICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICBhY3RpdmVTZWFyY2hQYXR0ZXJuID0gJydcclxuXHJcbiAgICAgIHJlc3VsdHMgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3coZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgc2VhcmNoUGFyZW50RWwuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1zZWFyY2gtc2VhcmNoaW5nJylcclxuICAgICAgc2VhcmNoRWwuY2xhc3NMaXN0LnJlbW92ZSgnYmVzcG9rZS1zZWFyY2gtbm8tcmVzdWx0JylcclxuICAgICAgc2VhcmNoSW5wdXRFbC5mb2N1cygpXHJcbiAgICAgIGtleW1hZ2UucHVzaFNjb3BlKCdzZWFyY2hpbmcnKVxyXG4gICAgICBkZWNrLnBhcmVudC5jbGFzc0xpc3QuYWRkKCdiZXNwb2tlLWJ1bGxldHMtb2ZmJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG5cclxuICAgICAgc2VhcmNoSW5wdXRFbC52YWx1ZSA9ICcnXHJcbiAgICAgIHNlYXJjaFBhcmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jlc3Bva2Utc2VhcmNoLXNlYXJjaGluZycpXHJcbiAgICAgIHNlYXJjaEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jlc3Bva2Utc2VhcmNoLW5vLXJlc3VsdCcpXHJcbiAgICAgIGtleW1hZ2UucG9wU2NvcGUoKVxyXG4gICAgICBjbGVhclJlc3VsdHMoKVxyXG4gICAgICBkZWNrLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdiZXNwb2tlLWJ1bGxldHMtb2ZmJylcclxuICAgICAgc2VhcmNoSW5wdXRFbC5ibHVyKClcclxuICAgICAgZGVjay5wYXJlbnQuZm9jdXMoKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcG9ydFJlc3VsdFN0YXRzKCkge1xyXG4gICAgICBjb25zdCBub1Jlc3VsdHMgPSByZXN1bHRzLmxlbmd0aCA9PT0gMFxyXG4gICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbC5pbm5lckhUTUwgPSBub1Jlc3VsdHMgPyAnJyA6XHJcbiAgICAgICAgYCR7Y3VycmVudFJlc3VsdEluZGV4ICsgMX0vJHtyZXN1bHRzLmxlbmd0aH1gXHJcbiAgICAgIHNlYXJjaEVsLmNsYXNzTGlzdC50b2dnbGUoJ2Jlc3Bva2Utc2VhcmNoLW5vLXJlc3VsdCcsIG5vUmVzdWx0cylcclxuICAgICAgc2VhcmNoRWwuY2xhc3NMaXN0LnRvZ2dsZSgnYmVzcG9rZS1zZWFyY2gtc2hha2luZycsIG5vUmVzdWx0cylcclxuICAgICAgc2VhcmNoRWwub25hbmltYXRpb25lbmQgPSAoKSA9PiB7XHJcbiAgICAgICAgc2VhcmNoRWwuY2xhc3NMaXN0LnJlbW92ZSgnYmVzcG9rZS1zZWFyY2gtc2hha2luZycpXHJcbiAgICAgICAgc2VhcmNoRWwub25hbmltYXRpb25lbmQgPSBudWxsXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmb2N1c0F0UmVzdWx0KGluZGV4KSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSByZXN1bHRzW2luZGV4XSB8fCB7fSxcclxuICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0c1tjdXJyZW50UmVzdWx0SW5kZXhdIHx8IHt9LFxyXG4gICAgICAgIHNsaWRlSW5kZXhPZlJlc3VsdCA9IChyZXN1bHQpLnNsaWRlSW5kZXhcclxuICAgICAgZGVjay5zbGlkZShzbGlkZUluZGV4T2ZSZXN1bHQpXHJcblxyXG4gICAgICBpZiAocHJldlJlc3VsdCAmJiBwcmV2UmVzdWx0LmVsKSB7XHJcbiAgICAgICAgcHJldlJlc3VsdC5lbC5jbGFzc0xpc3QucmVtb3ZlKCdiZXNwb2tlLXNlYXJjaC1yZXN1bHQtZm9jdXNlZCcpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuZWwpIHtcclxuICAgICAgICByZXN1bHQuZWwuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1zZWFyY2gtcmVzdWx0LWZvY3VzZWQnKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW50UmVzdWx0SW5kZXggPSBpbmRleFxyXG4gICAgICByZXBvcnRSZXN1bHRTdGF0cygpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2aWdhdGVSZXN1bHQoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGxldCBuZXdJbmRleCA9IChjdXJyZW50UmVzdWx0SW5kZXggKyBkaXJlY3Rpb24gKyByZXN1bHRzLmxlbmd0aCkgJSByZXN1bHRzLmxlbmd0aFxyXG4gICAgICBmb2N1c0F0UmVzdWx0KG5ld0luZGV4KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlYXJjaCgpIHtcclxuICAgICAgbGV0IHNlYXJjaFBhdHRlcm4gPSB0b05ldXRyYWxSZWdleChzZWFyY2hJbnB1dEVsLnZhbHVlLnRyaW0oKSlcclxuICAgICAgaWYgKHNlYXJjaFBhdHRlcm4gPT09ICcnKSB7XHJcbiAgICAgICAgY2xlYXJSZXN1bHRzKClcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAoc2VhcmNoUGF0dGVybiA9PT0gYWN0aXZlU2VhcmNoUGF0dGVybikge1xyXG4gICAgICAgIG5hdmlnYXRlUmVzdWx0KCsxKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNsZWFyUmVzdWx0cygpXHJcbiAgICAgIGFjdGl2ZVNlYXJjaFBhdHRlcm4gPSBzZWFyY2hQYXR0ZXJuXHJcblxyXG4gICAgICBjb25zdCBzZWFyY2hSZWdleCA9IG5ldyBSZWdFeHAoc2VhcmNoUGF0dGVybiwgJ2knKVxyXG4gICAgICBjb25zdCBtYXRjaGVkU2xpZGVzID0gY2FjaGVkU2xpZGVzVGV4dC5maWx0ZXIoc2xpZGUgPT4gc2VhcmNoUmVnZXgudGVzdChzbGlkZS50ZXh0KSlcclxuXHJcblxyXG4gICAgICBmdW5jdGlvbiBzZWFyY2hFbGVtZW50KGVsLCB2aXNpdEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcnRpYWxSZXN1bHRzID0gW11cclxuXHJcbiAgICAgICAgc3dpdGNoIChlbC5ub2RlVHlwZSkge1xyXG4gICAgICAgIGNhc2UgTm9kZS5URVhUX05PREU6XHJcbiAgICAgICAgICBpZiAoc2VhcmNoUmVnZXgudGVzdChlbC5kYXRhKSkge1xyXG4gICAgICAgICAgICBwYXJ0aWFsUmVzdWx0cyA9IHZpc2l0RnVuY3Rpb24oZWwpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XHJcbiAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBBcnJheS5mcm9tKGVsLmNoaWxkTm9kZXMpKSB7XHJcbiAgICAgICAgICAgIHBhcnRpYWxSZXN1bHRzLnB1c2goLi4uc2VhcmNoRWxlbWVudChjaGlsZCwgdmlzaXRGdW5jdGlvbikpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnRpYWxSZXN1bHRzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIG1hcmtSZXN1bHQodGV4dE5vZGUpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0ZXh0Tm9kZS5wYXJlbnROb2RlXHJcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGNvbnN0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgY29uc3QgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgICAgICAgd3JhcC5pbm5lckhUTUwgPSB0ZXh0Tm9kZS5kYXRhXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmIzYwOycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmIzYyOycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke3NlYXJjaFBhdHRlcm59KWAsICdnaScpLCAnPHNwYW4gY2xhc3M9XCJiZXNwb2tlLXNlYXJjaC1yZXN1bHRcIj4kMTwvc3Bhbj4nKVxyXG4gICAgICAgICAgd2hpbGUgKHdyYXAuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKHdyYXAuZmlyc3RDaGlsZClcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmcmFnXHJcbiAgICAgICAgfSkoKVxyXG5cclxuICAgICAgICBjb25zdCBpbnNlcnRlZCA9IGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iZXNwb2tlLXNlYXJjaC1yZXN1bHQnKVxyXG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIHRleHROb2RlKVxyXG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0ZXh0Tm9kZSlcclxuXHJcbiAgICAgICAgLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBuZXdseSBjcmVhdGVkIGVsZW1lbnRzXHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oaW5zZXJ0ZWQpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZpbmQgb2NjdXJyZW5jZXNcclxuICAgICAgcmVzdWx0cyA9IG1hdGNoZWRTbGlkZXMucmVkdWNlKChwcmV2aW91cywgY3VycikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlRWwgPSBkZWNrLnNsaWRlc1tjdXJyLmldXHJcbiAgICAgICAgY29uc3Qgb2NjdXJyZW5jZXMgPSBzZWFyY2hFbGVtZW50KHNsaWRlRWwsIG1hcmtSZXN1bHQpLm1hcChyZXN1bHQgPT4gKHsgc2xpZGVJbmRleDogY3Vyci5pLCBlbDogcmVzdWx0IH0pKVxyXG5cclxuICAgICAgICByZXR1cm4gcHJldmlvdXMuY29uY2F0KG9jY3VycmVuY2VzKVxyXG4gICAgICB9LCBbXSlcclxuXHJcbiAgICAgIC8vIHJlcG9ydCB0aGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzXHJcbiAgICAgIHNlYXJjaFJlc3VsdHNDb3VudEVsLmlubmVySFRNTCA9IGAxLyR7cmVzdWx0cy5sZW5ndGh9YFxyXG5cclxuICAgICAgLy8gbW92ZXMgdG8gdGhlIHNsaWRlIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXHJcbiAgICAgIGZvY3VzQXRSZXN1bHQoMClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTZWFyY2hCb3goKSB7XHJcbiAgICAgIHNlYXJjaFBhcmVudEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgc2VhcmNoRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICBzZWFyY2hJbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICBzZWFyY2hJbmZvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkZXRhaWxzJylcclxuXHJcbiAgICAgIHNlYXJjaFBhcmVudEVsLmlkID0gJ2Jlc3Bva2Utc2VhcmNoLXBhcmVudCdcclxuICAgICAgc2VhcmNoRWwuaWQgPSAnYmVzcG9rZS1zZWFyY2gnXHJcbiAgICAgIHNlYXJjaElucHV0RWwuaWQgPSAnYmVzcG9rZS1zZWFyY2gtaW5wdXQnXHJcbiAgICAgIHNlYXJjaElucHV0RWwudHlwZSA9ICdzZWFyY2gnXHJcbiAgICAgIHNlYXJjaElucHV0RWwucGxhY2Vob2xkZXIgPSB0ZXh0U2VhcmNoSGVyZVxyXG4gICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbC5pZCA9ICdiZXNwb2tlLXNlYXJjaC1yZXN1bHRzLWNvdW50J1xyXG4gICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICBzZWFyY2hJbmZvRWwuaWQgPSAnYmVzcG9rZS1zZWFyY2gtaW5mbydcclxuICAgICAgc2VhcmNoSW5mb0VsLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgIDxzdW1tYXJ5PiR7dGV4dEluc3RydWN0aW9uc308L3N1bW1hcnk+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImJlc3Bva2Utc2VhcmNoLWluZm8tcGFpclwiPiR7c2hvd0tleS5tYXAoayA9PiBgPGtiZD4ke2t9PC9rYmQ+YCkuam9pbignJyl9ICR7dGV4dE9wZW5TZWFyY2h9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJiZXNwb2tlLXNlYXJjaC1pbmZvLXBhaXJcIj4ke2Rpc21pc3NLZXkubWFwKGsgPT4gYDxrYmQ+JHtrfTwva2JkPmApLmpvaW4oJycpfSAke3RleHRDbG9zZVNlYXJjaH08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImJlc3Bva2Utc2VhcmNoLWluZm8tcGFpclwiPiR7dHJpZ2dlcktleS5tYXAoayA9PiBgPGtiZD4ke2t9PC9rYmQ+YCkuam9pbignJyl9ICR7dGV4dFNlYXJjaH08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImJlc3Bva2Utc2VhcmNoLWluZm8tcGFpclwiPiR7bmV4dEtleS5tYXAoayA9PiBgPGtiZD4ke2t9PC9rYmQ+YCkuam9pbignJyl9ICR7dGV4dE5leHRSZXN1bHR9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJiZXNwb2tlLXNlYXJjaC1pbmZvLXBhaXJcIj4ke3ByZXZpb3VzS2V5Lm1hcChrID0+IGA8a2JkPiR7a308L2tiZD5gKS5qb2luKCcnKX0gJHt0ZXh0UHJldmlvdXNSZXN1bHR9PC9zcGFuPlxyXG4gICAgICAgIGBcclxuICAgICAgc2VhcmNoRWwuYXBwZW5kQ2hpbGQoc2VhcmNoSW5wdXRFbClcclxuICAgICAgc2VhcmNoRWwuYXBwZW5kQ2hpbGQoc2VhcmNoUmVzdWx0c0NvdW50RWwpXHJcbiAgICAgIHNlYXJjaEVsLmFwcGVuZENoaWxkKHNlYXJjaEluZm9FbClcclxuICAgICAgc2VhcmNoUGFyZW50RWwuYXBwZW5kQ2hpbGQoc2VhcmNoRWwpXHJcblxyXG4gICAgICBkZWNrLnBhcmVudC5hcHBlbmRDaGlsZChzZWFyY2hQYXJlbnRFbClcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd0tleS5mb3JFYWNoKGtleSA9PiBrZXltYWdlKGtleSwgc2hvdykpXHJcbiAgICBkaXNtaXNzS2V5LmZvckVhY2goa2V5ID0+IGtleW1hZ2UoJ3NlYXJjaGluZycsIGtleSwgaGlkZSkpXHJcbiAgICB0cmlnZ2VyS2V5LmZvckVhY2goa2V5ID0+IGtleW1hZ2UoJ3NlYXJjaGluZycsIGtleSwgc2VhcmNoKSlcclxuICAgIG5leHRLZXkuZm9yRWFjaChrZXkgPT4ga2V5bWFnZSgnc2VhcmNoaW5nJywga2V5LCBuYXZpZ2F0ZVJlc3VsdC5iaW5kKGtleSwgKzEpLCB7cHJldmVudERlZmF1bHQ6IHRydWV9KSlcclxuICAgIHByZXZpb3VzS2V5LmZvckVhY2goa2V5ID0+IGtleW1hZ2UoJ3NlYXJjaGluZycsIGtleSwgbmF2aWdhdGVSZXN1bHQuYmluZChrZXksIC0xKSwge3ByZXZlbnREZWZhdWx0OiB0cnVlfSkpXHJcblxyXG4gICAgY3JlYXRlU2VhcmNoQm94KClcclxuXHJcbiAgICBpZiAoaW5zZXJ0U3R5bGVzKSB7XHJcbiAgICAgIF9kZXJlcV8oJy4uL2xpYi9iZXNwb2tlLXNlYXJjaC5jc3MnKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cbn0se1wiLi4vbGliL2Jlc3Bva2Utc2VhcmNoLmNzc1wiOjEsXCJrZXltYWdlXCI6NH1dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgYnJvd3NlciBmaWVsZCwgY2hlY2sgb3V0IHRoZSBicm93c2VyIGZpZWxkIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9icm93c2VyaWZ5LWhhbmRib29rI2Jyb3dzZXItZmllbGQuXG5cbnZhciBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXIgaW5zZXJ0U3R5bGVFbGVtZW50ID0gZnVuY3Rpb24oc3R5bGVFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgdmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmluc2VydEF0ID0gb3B0aW9ucy5pbnNlcnRBdCB8fCAnYm90dG9tJztcblxuICAgIGlmIChvcHRpb25zLmluc2VydEF0ID09PSAndG9wJykge1xuICAgICAgICBpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG4gICAgICAgICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09ICdib3R0b20nKSB7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcXCdpbnNlcnRBdFxcJy4gTXVzdCBiZSBcXCd0b3BcXCcgb3IgXFwnYm90dG9tXFwnLicpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIENyZWF0ZSBhIDxsaW5rPiB0YWcgd2l0aCBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXNcbiAgICBjcmVhdGVMaW5rOiBmdW5jdGlvbihocmVmLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgICBsaW5rLmhyZWYgPSBocmVmO1xuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKCAhIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9LFxuICAgIC8vIENyZWF0ZSBhIDxzdHlsZT4gdGFnIHdpdGggb3B0aW9uYWwgZGF0YSBhdHRyaWJ1dGVzXG4gICAgY3JlYXRlU3R5bGU6IGZ1bmN0aW9uKGNzc1RleHQsIGF0dHJpYnV0ZXMsIGV4dHJhT3B0aW9ucykge1xuICAgICAgICBleHRyYU9wdGlvbnMgPSBleHRyYU9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICggISBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3R5bGUuc2hlZXQpIHsgLy8gZm9yIGpzZG9tIGFuZCBJRTkrXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBjc3NUZXh0O1xuICAgICAgICAgICAgc3R5bGUuc2hlZXQuY3NzVGV4dCA9IGNzc1RleHQ7XG4gICAgICAgICAgICBpbnNlcnRTdHlsZUVsZW1lbnQoc3R5bGUsIHsgaW5zZXJ0QXQ6IGV4dHJhT3B0aW9ucy5pbnNlcnRBdCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7IC8vIGZvciBJRTggYW5kIGJlbG93XG4gICAgICAgICAgICBpbnNlcnRTdHlsZUVsZW1lbnQoc3R5bGUsIHsgaW5zZXJ0QXQ6IGV4dHJhT3B0aW9ucy5pbnNlcnRBdCB9KTtcbiAgICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1RleHQ7XG4gICAgICAgIH0gZWxzZSB7IC8vIGZvciBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmlcbiAgICAgICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1RleHQpKTtcbiAgICAgICAgICAgIGluc2VydFN0eWxlRWxlbWVudChzdHlsZSwgeyBpbnNlcnRBdDogZXh0cmFPcHRpb25zLmluc2VydEF0IH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxufSx7fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vLy8ga2V5bWFnZS5qcyAtIEphdmFzY3JpcHQga2V5Ym9hcmQgYmluZGluZ3MgaGFuZGxpbmdcbi8vLyBodHRwOi8vZ2l0aHViLmNvbS9waXJhbmhhL2tleW1hZ2Vcbi8vL1xuLy8vIChjKSAyMDEyLTIwMTYgQWxleGFuZGVyIFNvbG92eW92IHVuZGVyIHRlcm1zIG9mIElTQyBMaWNlbnNlXG5cbihmdW5jdGlvbihkZWZpbmUsIHVuZGVmaW5lZCkge1xuZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgIHZhciBWRVJTSU9OID0gJzEuMS4zJztcbiAgICB2YXIgaXNPc3ggPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB+bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNYWMgT1MgWCcpO1xuXG4gICAgLy8gRGVmaW5pbmcgYWxsIGtleXNcbiAgICB2YXIgTU9EUFJPUFMgPSBbJ3NoaWZ0S2V5JywgJ2N0cmxLZXknLCAnYWx0S2V5JywgJ21ldGFLZXknXTtcbiAgICB2YXIgTU9EUyA9IHtcbiAgICAgICAgJ3NoaWZ0JzogJ3NoaWZ0JyxcbiAgICAgICAgJ2N0cmwnOiAnY3RybCcsICdjb250cm9sJzogJ2N0cmwnLFxuICAgICAgICAnYWx0JzogJ2FsdCcsICdvcHRpb24nOiAnYWx0JyxcbiAgICAgICAgJ3dpbic6ICdtZXRhJywgJ2NtZCc6ICdtZXRhJywgJ3N1cGVyJzogJ21ldGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnbWV0YSc6ICdtZXRhJyxcbiAgICAgICAgLy8gZGVmYXVsdCBtb2RpZmllciBmb3Igb3MgeCBpcyBjbWQgYW5kIGZvciBvdGhlcnMgaXMgY3RybFxuICAgICAgICAnZGVmbW9kJzogIGlzT3N4ID8gJ21ldGEnIDogJ2N0cmwnXG4gICAgICAgIH07XG4gICAgdmFyIE1PRE9SREVSID0gWydzaGlmdCcsICdjdHJsJywgJ2FsdCcsICdtZXRhJ107XG4gICAgdmFyIE1PRE5VTVMgPSBbMTYsIDE3LCAxOCwgOTFdO1xuXG4gICAgdmFyIEtFWVMgPSB7XG4gICAgICAgICdiYWNrc3BhY2UnOiA4LFxuICAgICAgICAndGFiJzogOSxcbiAgICAgICAgJ2VudGVyJzogMTMsICdyZXR1cm4nOiAxMyxcbiAgICAgICAgJ3BhdXNlJzogMTksXG4gICAgICAgICdjYXBzJzogMjAsICdjYXBzbG9jayc6IDIwLFxuICAgICAgICAnZXNjYXBlJzogMjcsICdlc2MnOiAyNyxcbiAgICAgICAgJ3NwYWNlJzogMzIsXG4gICAgICAgICdwZ3VwJzogMzMsICdwYWdldXAnOiAzMyxcbiAgICAgICAgJ3BnZG93bic6IDM0LCAncGFnZWRvd24nOiAzNCxcbiAgICAgICAgJ2VuZCc6IDM1LFxuICAgICAgICAnaG9tZSc6IDM2LFxuICAgICAgICAnaW5zJzogNDUsICdpbnNlcnQnOiA0NSxcbiAgICAgICAgJ2RlbCc6IDQ2LCAnZGVsZXRlJzogNDYsXG5cbiAgICAgICAgJ2xlZnQnOiAzNyxcbiAgICAgICAgJ3VwJzogMzgsXG4gICAgICAgICdyaWdodCc6IDM5LFxuICAgICAgICAnZG93bic6IDQwLFxuXG4gICAgICAgICcqJzogMTA2LFxuICAgICAgICAnKyc6IDEwNywgJ3BsdXMnOiAxMDcsXG4gICAgICAgICdtaW51cyc6IDEwOSxcbiAgICAgICAgJzsnOiAxODYsXG4gICAgICAgICc9JzogMTg3LFxuICAgICAgICAnLCc6IDE4OCxcbiAgICAgICAgJy0nOiAxODksXG4gICAgICAgICcuJzogMTkwLFxuICAgICAgICAnLyc6IDE5MSxcbiAgICAgICAgJ2AnOiAxOTIsXG4gICAgICAgICdbJzogMjE5LFxuICAgICAgICAnXFxcXCc6IDIyMCxcbiAgICAgICAgJ10nOiAyMjEsXG4gICAgICAgIFwiJ1wiOiAyMjJcbiAgICB9O1xuXG4gICAgdmFyIGk7XG4gICAgLy8gbnVtcGFkXG4gICAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgS0VZU1snbnVtLScgKyBpXSA9IGkgKyA5NTtcbiAgICB9XG4gICAgLy8gdG9wIHJvdyAwLTlcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBLRVlTW2kudG9TdHJpbmcoKV0gPSBpICsgNDg7XG4gICAgfVxuICAgIC8vIGYxLWYyNFxuICAgIGZvciAoaSA9IDE7IGkgPCAyNTsgaSsrKSB7XG4gICAgICAgIEtFWVNbJ2YnICsgaV0gPSBpICsgMTExO1xuICAgIH1cbiAgICAvLyBhbHBoYWJldFxuICAgIGZvciAoaSA9IDY1OyBpIDwgOTE7IGkrKykge1xuICAgICAgICBLRVlTW1N0cmluZy5mcm9tQ2hhckNvZGUoaSkudG9Mb3dlckNhc2UoKV0gPSBpO1xuICAgIH1cblxuICAgIC8vIFJldmVyc2Uga2V5IGNvZGVzXG4gICAgdmFyIEtFWVJFViA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gS0VZUykge1xuICAgICAgICB2YXIgdmFsID0gS0VZU1trXTtcbiAgICAgICAgaWYgKCFLRVlSRVZbdmFsXSB8fCBLRVlSRVZbdmFsXS5sZW5ndGggPCBrLmxlbmd0aCkge1xuICAgICAgICAgICAgS0VZUkVWW3ZhbF0gPSBrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBY3R1YWwgd29yayBpcyBkb25lIGhlcmVcblxuICAgIHZhciBjdXJyZW50U2NvcGUgPSAnJztcbiAgICB2YXIgYWxsQ2hhaW5zID0ge307XG5cbiAgICBmdW5jdGlvbiBwYXJzZUtleVN0cmluZyhrZXlzdHJpbmcpIHtcbiAgICAgICAgdmFyIGJpdHMgPSBrZXlzdHJpbmcuc3BsaXQoLy0oPyEkKS8pO1xuICAgICAgICB2YXIgYnV0dG9uID0gYml0c1tiaXRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIga2V5ID0ge2NvZGU6IEtFWVNbYnV0dG9uXX07XG5cbiAgICAgICAgaWYgKCFrZXkuY29kZSkge1xuICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24ga2V5IFwiJyArIGJ1dHRvbiArICdcIiBpbiBrZXlzdHJpbmcgXCInICtcbiAgICAgICAgICAgICAgICBrZXlzdHJpbmcgKyAnXCInO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1vZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaXRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgYnV0dG9uID0gYml0c1tpXTtcbiAgICAgICAgICAgIG1vZCA9IE1PRFNbYnV0dG9uXTtcbiAgICAgICAgICAgIGlmICghbW9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdVbmtub3duIG1vZGlmaWVyIFwiJyArIGJ1dHRvbiArICdcIiBpbiBrZXlzdHJpbmcgXCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXN0cmluZyArICdcIic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlbbW9kXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeUtleShrZXkpIHtcbiAgICAgICAgdmFyIHMgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNT0RPUkRFUi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGtleVtNT0RPUkRFUltpXV0pIHtcbiAgICAgICAgICAgICAgICBzICs9IE1PRE9SREVSW2ldICsgJy0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHMgKz0gS0VZUkVWW2tleS5jb2RlXTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplS2V5Q2hhaW4oa2V5Y2hhaW5TdHJpbmcpIHtcbiAgICAgICAgdmFyIGtleWNoYWluID0gW107XG4gICAgICAgIHZhciBrZXlzID0ga2V5Y2hhaW5TdHJpbmcuc3BsaXQoJyAnKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXJzZUtleVN0cmluZyhrZXlzW2ldKTtcbiAgICAgICAgICAgIGtleSA9IHN0cmluZ2lmeUtleShrZXkpO1xuICAgICAgICAgICAga2V5Y2hhaW4ucHVzaChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5Y2hhaW4ub3JpZ2luYWwgPSBrZXljaGFpblN0cmluZztcbiAgICAgICAgcmV0dXJuIGtleWNoYWluO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV2ZW50S2V5U3RyaW5nKGUpIHtcbiAgICAgICAgdmFyIGtleSA9IHtjb2RlOiBlLmtleUNvZGV9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1PRFBST1BTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kID0gTU9EUFJPUFNbaV07XG4gICAgICAgICAgICBpZiAoZVttb2RdKSB7XG4gICAgICAgICAgICAgICAga2V5W21vZC5zbGljZSgwLCBtb2QubGVuZ3RoIC0gMyldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5naWZ5S2V5KGtleSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TmVzdGVkQ2hhaW5zKGNoYWlucywgc2NvcGUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY29wZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJpdCA9IHNjb3BlW2ldO1xuXG4gICAgICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICAgICAgY2hhaW5zID0gY2hhaW5zW2JpdF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY2hhaW5zKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYWlucztcbiAgICB9XG5cbiAgICB2YXIgc2VxdWVuY2UgPSBbXTtcbiAgICBmdW5jdGlvbiBkaXNwYXRjaChlKSB7XG4gICAgICAgIC8vIFNraXAgYWxsIG1vZGlmaWVyc1xuICAgICAgICBpZiAofk1PRE5VTVMuaW5kZXhPZihlLmtleUNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VxID0gc2VxdWVuY2Uuc2xpY2UoKTtcbiAgICAgICAgc2VxLnB1c2goZXZlbnRLZXlTdHJpbmcoZSkpO1xuICAgICAgICB2YXIgc2NvcGUgPSBjdXJyZW50U2NvcGUuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIG1hdGNoZWQsIGNoYWlucywga2V5O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBzY29wZS5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjaGFpbnMgPSBnZXROZXN0ZWRDaGFpbnMoYWxsQ2hhaW5zLCBzY29wZS5zbGljZSgwLCBpKSk7XG4gICAgICAgICAgICBpZiAoIWNoYWlucykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGtleSA9IHNlcVtqXTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYWluc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYWlucyA9IGNoYWluc1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZmluaXRpb25TY29wZSA9IHNjb3BlLnNsaWNlKDAsIGkpLmpvaW4oJy4nKTtcbiAgICAgICAgdmFyIHByZXZlbnREZWZhdWx0ID0gY2hhaW5zLnByZXZlbnREZWZhdWx0O1xuXG4gICAgICAgIC8vIHBhcnRpYWwgbWF0Y2gsIHNhdmUgdGhlIHNlcXVlbmNlXG4gICAgICAgIGlmIChtYXRjaGVkICYmICFjaGFpbnMuaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHNlcXVlbmNlID0gc2VxO1xuICAgICAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFpbnMuaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNoYWlucy5oYW5kbGVyc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGhhbmRsZXIuX2tleW1hZ2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gaGFuZGxlci5jYWxsKG9wdGlvbnMuY29udGV4dCwgZSwge1xuICAgICAgICAgICAgICAgICAgICBzaG9ydGN1dDogb3B0aW9ucy5vcmlnaW5hbCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IGN1cnJlbnRTY29wZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblNjb3BlOiBkZWZpbml0aW9uU2NvcGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlaXRoZXIgbWF0Y2hlZCBvciBub3QsIGRyb3AgdGhlIHNlcXVlbmNlXG4gICAgICAgIHNlcXVlbmNlID0gW107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGFuZGxlcnMoc2NvcGUsIGtleWNoYWluLCBmbikge1xuICAgICAgICB2YXIgYml0cyA9IHNjb3BlLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBjaGFpbnMgPSBhbGxDaGFpbnM7XG4gICAgICAgIGJpdHMgPSBiaXRzLmNvbmNhdChrZXljaGFpbik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBiaXRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJpdCA9IGJpdHNbaV07XG4gICAgICAgICAgICBpZiAoIWJpdCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNoYWlucyA9IGNoYWluc1tiaXRdIHx8IChjaGFpbnNbYml0XSA9IHt9KTtcbiAgICAgICAgICAgIGlmIChmbiAmJiBmbi5fa2V5bWFnZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGNoYWlucy5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpID09PSBsIC0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVycyA9IGNoYWlucy5oYW5kbGVycyB8fCAoY2hhaW5zLmhhbmRsZXJzID0gW10pO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnbktleShzY29wZSwga2V5Y2hhaW4sIGZuKSB7XG4gICAgICAgIHZhciBoYW5kbGVycyA9IGdldEhhbmRsZXJzKHNjb3BlLCBrZXljaGFpbiwgZm4pO1xuICAgICAgICBoYW5kbGVycy5wdXNoKGZuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmFzc2lnbktleShzY29wZSwga2V5Y2hhaW4sIGZuKSB7XG4gICAgICAgIHZhciBoYW5kbGVycyA9IGdldEhhbmRsZXJzKHNjb3BlLCBrZXljaGFpbik7XG4gICAgICAgIHZhciBpZHggPSBoYW5kbGVycy5pbmRleE9mKGZuKTtcbiAgICAgICAgaWYgKH5pZHgpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VkKHNjb3BlLCBrZXljaGFpbiwgZm4sIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGtleWNoYWluID09PSB1bmRlZmluZWQgJiYgZm4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGtleWNoYWluLCBmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXltYWdlKHNjb3BlLCBrZXljaGFpbiwgZm4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Yga2V5Y2hhaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBmbjtcbiAgICAgICAgICAgIGZuID0ga2V5Y2hhaW47XG4gICAgICAgICAgICBrZXljaGFpbiA9IHNjb3BlO1xuICAgICAgICAgICAgc2NvcGUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3JtYWxpemVkID0gbm9ybWFsaXplS2V5Q2hhaW4oa2V5Y2hhaW4pO1xuXG4gICAgICAgIHJldHVybiBbc2NvcGUsIG5vcm1hbGl6ZWQsIGZuLCBvcHRpb25zXTtcbiAgICB9XG5cbiAgICAvLyBvcHRpb25hbCBhcmd1bWVudHM6IHNjb3BlLCBvcHRpb25zLlxuICAgIGZ1bmN0aW9uIGtleW1hZ2Uoc2NvcGUsIGtleWNoYWluLCBmbiwgb3B0aW9ucykge1xuICAgICAgICB2YXIgYXJncyA9IHBhcnNlZChzY29wZSwga2V5Y2hhaW4sIGZuLCBvcHRpb25zKTtcbiAgICAgICAgZm4gPSBhcmdzWzJdO1xuICAgICAgICBvcHRpb25zID0gYXJnc1szXTtcbiAgICAgICAgZm4uX2tleW1hZ2UgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBmbi5fa2V5bWFnZS5vcmlnaW5hbCA9IGtleWNoYWluO1xuICAgICAgICBhc3NpZ25LZXkuYXBwbHkobnVsbCwgYXJncyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVuYXNzaWduS2V5LmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGtleW1hZ2UudW5iaW5kID0gZnVuY3Rpb24oc2NvcGUsIGtleWNoYWluLCBmbikge1xuICAgICAgICB2YXIgYXJncyA9IHBhcnNlZChzY29wZSwga2V5Y2hhaW4sIGZuKTtcbiAgICAgICAgdW5hc3NpZ25LZXkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfTtcblxuICAgIGtleW1hZ2UucGFyc2UgPSBwYXJzZUtleVN0cmluZztcbiAgICBrZXltYWdlLnN0cmluZ2lmeSA9IHN0cmluZ2lmeUtleTtcblxuICAgIGtleW1hZ2UuYmluZGluZ3MgPSBhbGxDaGFpbnM7XG5cbiAgICBrZXltYWdlLnNldFNjb3BlID0gZnVuY3Rpb24oc2NvcGUpIHtcbiAgICAgICAgY3VycmVudFNjb3BlID0gc2NvcGUgPyBzY29wZSA6ICcnO1xuICAgIH07XG5cbiAgICBrZXltYWdlLmdldFNjb3BlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjdXJyZW50U2NvcGU7IH07XG5cbiAgICBrZXltYWdlLnB1c2hTY29wZSA9IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICAgIGN1cnJlbnRTY29wZSA9IChjdXJyZW50U2NvcGUgPyBjdXJyZW50U2NvcGUgKyAnLicgOiAnJykgKyBzY29wZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRTY29wZTtcbiAgICB9O1xuXG4gICAga2V5bWFnZS5wb3BTY29wZSA9IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgICAgIGkgPSBjdXJyZW50U2NvcGUubGFzdEluZGV4T2YoJy4nKTtcbiAgICAgICAgICAgIHNjb3BlID0gY3VycmVudFNjb3BlLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IGkgPT0gLTEgPyAnJyA6IGN1cnJlbnRTY29wZS5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHJldHVybiBzY29wZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRTY29wZSA9IGN1cnJlbnRTY29wZS5yZXBsYWNlKFxuICAgICAgICAgICAgbmV3IFJlZ0V4cCgnKF58XFxcXC4pJyArIHNjb3BlICsgJyhcXFxcLnwkKS4qJyksICcnKTtcbiAgICAgICAgcmV0dXJuIHNjb3BlO1xuICAgIH07XG5cbiAgICBrZXltYWdlLnZlcnNpb24gPSBWRVJTSU9OO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkaXNwYXRjaCwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIGtleW1hZ2U7XG59KTtcbn0pKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cua2V5bWFnZSA9IGZhY3RvcnkoKTtcbiAgICB9XG59KTtcblxufSx7fV19LHt9LFsyXSkoMilcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNrKSB7XG4gICAgdmFyIGFjdGl2ZVNsaWRlSW5kZXgsXG4gICAgICBhY3RpdmVCdWxsZXRJbmRleCxcblxuICAgICAgYnVsbGV0cyA9IGRlY2suc2xpZGVzLm1hcChmdW5jdGlvbihzbGlkZSkge1xuICAgICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycgPyBvcHRpb25zIDogJ1tkYXRhLWJlc3Bva2UtYnVsbGV0XScpKSwgMCk7XG4gICAgICB9KSxcblxuICAgICAgbmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV4dFNsaWRlSW5kZXggPSBhY3RpdmVTbGlkZUluZGV4ICsgMTtcblxuICAgICAgICBpZiAoYWN0aXZlU2xpZGVIYXNCdWxsZXRCeU9mZnNldCgxKSkge1xuICAgICAgICAgIGFjdGl2YXRlQnVsbGV0KGFjdGl2ZVNsaWRlSW5kZXgsIGFjdGl2ZUJ1bGxldEluZGV4ICsgMSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGJ1bGxldHNbbmV4dFNsaWRlSW5kZXhdKSB7XG4gICAgICAgICAgYWN0aXZhdGVCdWxsZXQobmV4dFNsaWRlSW5kZXgsIDApO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBwcmV2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwcmV2U2xpZGVJbmRleCA9IGFjdGl2ZVNsaWRlSW5kZXggLSAxO1xuXG4gICAgICAgIGlmIChhY3RpdmVTbGlkZUhhc0J1bGxldEJ5T2Zmc2V0KC0xKSkge1xuICAgICAgICAgIGFjdGl2YXRlQnVsbGV0KGFjdGl2ZVNsaWRlSW5kZXgsIGFjdGl2ZUJ1bGxldEluZGV4IC0gMSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGJ1bGxldHNbcHJldlNsaWRlSW5kZXhdKSB7XG4gICAgICAgICAgYWN0aXZhdGVCdWxsZXQocHJldlNsaWRlSW5kZXgsIGJ1bGxldHNbcHJldlNsaWRlSW5kZXhdLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBhY3RpdmF0ZUJ1bGxldCA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgsIGJ1bGxldEluZGV4KSB7XG4gICAgICAgIGFjdGl2ZVNsaWRlSW5kZXggPSBzbGlkZUluZGV4O1xuICAgICAgICBhY3RpdmVCdWxsZXRJbmRleCA9IGJ1bGxldEluZGV4O1xuXG4gICAgICAgIGJ1bGxldHMuZm9yRWFjaChmdW5jdGlvbihzbGlkZSwgcykge1xuICAgICAgICAgIHNsaWRlLmZvckVhY2goZnVuY3Rpb24oYnVsbGV0LCBiKSB7XG4gICAgICAgICAgICBidWxsZXQuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1idWxsZXQnKTtcblxuICAgICAgICAgICAgaWYgKHMgPCBzbGlkZUluZGV4IHx8IHMgPT09IHNsaWRlSW5kZXggJiYgYiA8PSBidWxsZXRJbmRleCkge1xuICAgICAgICAgICAgICBidWxsZXQuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1idWxsZXQtYWN0aXZlJyk7XG4gICAgICAgICAgICAgIGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdiZXNwb2tlLWJ1bGxldC1pbmFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnVsbGV0LmNsYXNzTGlzdC5hZGQoJ2Jlc3Bva2UtYnVsbGV0LWluYWN0aXZlJyk7XG4gICAgICAgICAgICAgIGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdiZXNwb2tlLWJ1bGxldC1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHMgPT09IHNsaWRlSW5kZXggJiYgYiA9PT0gYnVsbGV0SW5kZXgpIHtcbiAgICAgICAgICAgICAgYnVsbGV0LmNsYXNzTGlzdC5hZGQoJ2Jlc3Bva2UtYnVsbGV0LWN1cnJlbnQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdiZXNwb2tlLWJ1bGxldC1jdXJyZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgYWN0aXZlU2xpZGVIYXNCdWxsZXRCeU9mZnNldCA9IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gYnVsbGV0c1thY3RpdmVTbGlkZUluZGV4XVthY3RpdmVCdWxsZXRJbmRleCArIG9mZnNldF0gIT09IHVuZGVmaW5lZDtcbiAgICAgIH07XG5cbiAgICBkZWNrLm9uKCduZXh0JywgbmV4dCk7XG4gICAgZGVjay5vbigncHJldicsIHByZXYpO1xuXG4gICAgZGVjay5vbignc2xpZGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBhY3RpdmF0ZUJ1bGxldChlLmluZGV4LCAwKTtcbiAgICB9KTtcblxuICAgIGFjdGl2YXRlQnVsbGV0KDAsIDApO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNrKSB7XG4gICAgdmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNscykge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdiZXNwb2tlLScgKyBjbHMpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xzKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZVxuICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJ2Jlc3Bva2UtJyArIGNscyArJyhcXFxcc3wkKScsICdnJyksICcgJylcbiAgICAgICAgICAudHJpbSgpO1xuICAgICAgfSxcblxuICAgICAgZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKGVsLCBpbmRleCkge1xuICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSBkZWNrLnNsaWRlc1tkZWNrLnNsaWRlKCldLFxuICAgICAgICAgIG9mZnNldCA9IGluZGV4IC0gZGVjay5zbGlkZSgpLFxuICAgICAgICAgIG9mZnNldENsYXNzID0gb2Zmc2V0ID4gMCA/ICdhZnRlcicgOiAnYmVmb3JlJztcblxuICAgICAgICBbJ2JlZm9yZSgtXFxcXGQrKT8nLCAnYWZ0ZXIoLVxcXFxkKyk/JywgJ2FjdGl2ZScsICdpbmFjdGl2ZSddLm1hcChyZW1vdmVDbGFzcy5iaW5kKG51bGwsIGVsKSk7XG5cbiAgICAgICAgaWYgKGVsICE9PSBhY3RpdmVTbGlkZSkge1xuICAgICAgICAgIFsnaW5hY3RpdmUnLCBvZmZzZXRDbGFzcywgb2Zmc2V0Q2xhc3MgKyAnLScgKyBNYXRoLmFicyhvZmZzZXQpXS5tYXAoYWRkQ2xhc3MuYmluZChudWxsLCBlbCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgYWRkQ2xhc3MoZGVjay5wYXJlbnQsICdwYXJlbnQnKTtcbiAgICBkZWNrLnNsaWRlcy5tYXAoZnVuY3Rpb24oZWwpIHsgYWRkQ2xhc3MoZWwsICdzbGlkZScpOyB9KTtcblxuICAgIGRlY2sub24oJ2FjdGl2YXRlJywgZnVuY3Rpb24oZSkge1xuICAgICAgZGVjay5zbGlkZXMubWFwKGRlYWN0aXZhdGUpO1xuICAgICAgYWRkQ2xhc3MoZS5zbGlkZSwgJ2FjdGl2ZScpO1xuICAgICAgcmVtb3ZlQ2xhc3MoZS5zbGlkZSwgJ2luYWN0aXZlJyk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNrKSB7XG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9IG9wdGlvbnMgIT09ICd2ZXJ0aWNhbCc7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUud2hpY2ggPT0gMzQgfHwgLy8gUEFHRSBET1dOXG4gICAgICAgIChlLndoaWNoID09IDMyICYmICFlLnNoaWZ0S2V5KSB8fCAvLyBTUEFDRSBXSVRIT1VUIFNISUZUXG4gICAgICAgIChpc0hvcml6b250YWwgJiYgZS53aGljaCA9PSAzOSkgfHwgLy8gUklHSFRcbiAgICAgICAgKCFpc0hvcml6b250YWwgJiYgZS53aGljaCA9PSA0MCkgLy8gRE9XTlxuICAgICAgKSB7IGRlY2submV4dCgpOyB9XG5cbiAgICAgIGlmIChlLndoaWNoID09IDMzIHx8IC8vIFBBR0UgVVBcbiAgICAgICAgKGUud2hpY2ggPT0gMzIgJiYgZS5zaGlmdEtleSkgfHwgLy8gU1BBQ0UgKyBTSElGVFxuICAgICAgICAoaXNIb3Jpem9udGFsICYmIGUud2hpY2ggPT0gMzcpIHx8IC8vIExFRlRcbiAgICAgICAgKCFpc0hvcml6b250YWwgJiYgZS53aGljaCA9PSAzOCkgLy8gVVBcbiAgICAgICkgeyBkZWNrLnByZXYoKTsgfVxuICAgIH0pO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oZGVjaykge1xuICAgIHZhciBwYXJlbnQgPSBkZWNrLnBhcmVudCxcbiAgICAgIGZpcnN0U2xpZGUgPSBkZWNrLnNsaWRlc1swXSxcbiAgICAgIHNsaWRlSGVpZ2h0ID0gZmlyc3RTbGlkZS5vZmZzZXRIZWlnaHQsXG4gICAgICBzbGlkZVdpZHRoID0gZmlyc3RTbGlkZS5vZmZzZXRXaWR0aCxcbiAgICAgIHVzZVpvb20gPSBvcHRpb25zID09PSAnem9vbScgfHwgKCd6b29tJyBpbiBwYXJlbnQuc3R5bGUgJiYgb3B0aW9ucyAhPT0gJ3RyYW5zZm9ybScpLFxuXG4gICAgICBpbm5lcldyYXAgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBpbm5lcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5uZXJXcmFwcGVyLmNsYXNzTmFtZSA9ICdiZXNwb2tlLXNjYWxlLXBhcmVudCc7XG4gICAgICAgIHdoaWxlIChlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpbm5lcldyYXBwZXIuYXBwZW5kQ2hpbGQoZWxlbWVudC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChpbm5lcldyYXBwZXIpO1xuICAgICAgICByZXR1cm4gaW5uZXJXcmFwcGVyO1xuICAgICAgfSxcblxuICAgICAgZWxlbWVudCA9IHVzZVpvb20gPyBwYXJlbnQgOiBpbm5lcldyYXAocGFyZW50KSxcblxuICAgICAgdHJhbnNmb3JtUHJvcGVydHkgPSAoZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgdmFyIHByZWZpeGVzID0gJ01veiBXZWJraXQgTyBtcycuc3BsaXQoJyAnKTtcbiAgICAgICAgcmV0dXJuIHByZWZpeGVzLnJlZHVjZShmdW5jdGlvbihjdXJyZW50UHJvcGVydHksIHByZWZpeCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArIHByb3BlcnR5IGluIHBhcmVudC5zdHlsZSA/IHByZWZpeCArIHByb3BlcnR5IDogY3VycmVudFByb3BlcnR5O1xuICAgICAgICAgIH0sIHByb3BlcnR5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSgnVHJhbnNmb3JtJykpLFxuXG4gICAgICBzY2FsZSA9IHVzZVpvb20gP1xuICAgICAgICBmdW5jdGlvbihyYXRpbywgZWxlbWVudCkge1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUuem9vbSA9IHJhdGlvO1xuICAgICAgICB9IDpcbiAgICAgICAgZnVuY3Rpb24ocmF0aW8sIGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9ICdzY2FsZSgnICsgcmF0aW8gKyAnKSc7XG4gICAgICAgIH0sXG5cbiAgICAgIHNjYWxlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4U2NhbGUgPSBwYXJlbnQub2Zmc2V0V2lkdGggLyBzbGlkZVdpZHRoLFxuICAgICAgICAgIHlTY2FsZSA9IChwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gc2xpZGVIZWlnaHQpIHx8IDA7XG5cbiAgICAgICAgc2NhbGUoTWF0aC5taW4oeFNjYWxlLCB5U2NhbGUpLCBlbGVtZW50KTtcbiAgICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2NhbGVBbGwpO1xuICAgIHNjYWxlQWxsKCk7XG4gIH07XG5cbn07XG4iLCIvKiFcbiAqIGJlc3Bva2UtdGhlbWUtY3ViZSB2Mi4wLjFcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNCwgTWFyayBEYWxnbGVpc2hcbiAqIFRoaXMgY29udGVudCBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9taXQtbGljZW5zZS5vcmcvbWFya2RhbGdsZWlzaFxuICovXG5cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKGUpO2Vsc2V7dmFyIG87XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9vPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP289Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYobz1zZWxmKTt2YXIgZj1vO2Y9Zi5iZXNwb2tlfHwoZi5iZXNwb2tlPXt9KSxmPWYudGhlbWVzfHwoZi50aGVtZXM9e30pLGYuY3ViZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGNsYXNzZXMgPSBfZGVyZXFfKCdiZXNwb2tlLWNsYXNzZXMnKTtcbnZhciBpbnNlcnRDc3MgPSBfZGVyZXFfKCdpbnNlcnQtY3NzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjc3MgPSBcIip7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbjowO3BhZGRpbmc6MH1AbWVkaWEgcHJpbnR7Knstd2Via2l0LXByaW50LWNvbG9yLWFkanVzdDpleGFjdH19QHBhZ2V7c2l6ZTpsYW5kc2NhcGU7bWFyZ2luOjB9LmJlc3Bva2UtcGFyZW50ey13ZWJraXQtdHJhbnNpdGlvbjpiYWNrZ3JvdW5kIC42cyBlYXNlO3RyYW5zaXRpb246YmFja2dyb3VuZCAuNnMgZWFzZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHByaW50ey5iZXNwb2tlLXBhcmVudHtvdmVyZmxvdzp2aXNpYmxlO3Bvc2l0aW9uOnN0YXRpY319LmJlc3Bva2UtdGhlbWUtY3ViZS1zbGlkZS1wYXJlbnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7LXdlYmtpdC1wZXJzcGVjdGl2ZTo2MDBweDtwZXJzcGVjdGl2ZTo2MDBweDtwb2ludGVyLWV2ZW50czpub25lfS5iZXNwb2tlLXNsaWRle3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC42cyBlYXNlLG9wYWNpdHkgLjZzIGVhc2UsYmFja2dyb3VuZCAuNnMgZWFzZTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuNnMgZWFzZSxvcGFjaXR5IC42cyBlYXNlLGJhY2tncm91bmQgLjZzIGVhc2U7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCUgMDstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy13ZWJraXQtYWxpZ24taXRlbXM6Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6NjQwcHg7aGVpZ2h0OjQ4MHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bWFyZ2luLXRvcDotMjQwcHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTMyMHB4O2JhY2tncm91bmQ6I2VhZWFlYTtwYWRkaW5nOjQwcHg7Ym9yZGVyLXJhZGl1czowfUBtZWRpYSBwcmludHsuYmVzcG9rZS1zbGlkZXt6b29tOjEhaW1wb3J0YW50O2hlaWdodDo3NDNweDt3aWR0aDoxMDAlO3BhZ2UtYnJlYWstYmVmb3JlOmFsd2F5cztwb3NpdGlvbjpzdGF0aWM7bWFyZ2luOjA7LXdlYmtpdC10cmFuc2l0aW9uOm5vbmU7dHJhbnNpdGlvbjpub25lfX0uYmVzcG9rZS1iZWZvcmV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgxMDBweCl0cmFuc2xhdGVYKC0zMjBweClyb3RhdGVZKC05MGRlZyl0cmFuc2xhdGVYKC0zMjBweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMTAwcHgpdHJhbnNsYXRlWCgtMzIwcHgpcm90YXRlWSgtOTBkZWcpdHJhbnNsYXRlWCgtMzIwcHgpfUBtZWRpYSBwcmludHsuYmVzcG9rZS1iZWZvcmV7LXdlYmtpdC10cmFuc2Zvcm06bm9uZTt0cmFuc2Zvcm06bm9uZX19LmJlc3Bva2UtYWZ0ZXJ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwcHgpdHJhbnNsYXRlWCgzMjBweClyb3RhdGVZKDkwZGVnKXRyYW5zbGF0ZVgoMzIwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMDBweCl0cmFuc2xhdGVYKDMyMHB4KXJvdGF0ZVkoOTBkZWcpdHJhbnNsYXRlWCgzMjBweCl9QG1lZGlhIHByaW50ey5iZXNwb2tlLWFmdGVyey13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmV9fS5iZXNwb2tlLWluYWN0aXZle29wYWNpdHk6MDtwb2ludGVyLWV2ZW50czpub25lfUBtZWRpYSBwcmludHsuYmVzcG9rZS1pbmFjdGl2ZXtvcGFjaXR5OjF9fS5iZXNwb2tlLWFjdGl2ZXtvcGFjaXR5OjF9LmJlc3Bva2UtYnVsbGV0ey13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2V9QG1lZGlhIHByaW50ey5iZXNwb2tlLWJ1bGxldHstd2Via2l0LXRyYW5zaXRpb246bm9uZTt0cmFuc2l0aW9uOm5vbmV9fS5iZXNwb2tlLWJ1bGxldC1pbmFjdGl2ZXtvcGFjaXR5OjB9bGkuYmVzcG9rZS1idWxsZXQtaW5hY3RpdmV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgxNnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgxNnB4KX1AbWVkaWEgcHJpbnR7bGkuYmVzcG9rZS1idWxsZXQtaW5hY3RpdmV7LXdlYmtpdC10cmFuc2Zvcm06bm9uZTt0cmFuc2Zvcm06bm9uZX19QG1lZGlhIHByaW50ey5iZXNwb2tlLWJ1bGxldC1pbmFjdGl2ZXtvcGFjaXR5OjF9fS5iZXNwb2tlLWJ1bGxldC1hY3RpdmV7b3BhY2l0eToxfS5iZXNwb2tlLXNjYWxlLXBhcmVudHstd2Via2l0LXBlcnNwZWN0aXZlOjYwMHB4O3BlcnNwZWN0aXZlOjYwMHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO3BvaW50ZXItZXZlbnRzOm5vbmV9LmJlc3Bva2Utc2NhbGUtcGFyZW50IC5iZXNwb2tlLWFjdGl2ZXtwb2ludGVyLWV2ZW50czphdXRvfUBtZWRpYSBwcmludHsuYmVzcG9rZS1zY2FsZS1wYXJlbnR7LXdlYmtpdC10cmFuc2Zvcm06bm9uZSFpbXBvcnRhbnQ7dHJhbnNmb3JtOm5vbmUhaW1wb3J0YW50fX0uYmVzcG9rZS1wcm9ncmVzcy1wYXJlbnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjJweH1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTM2NnB4KXsuYmVzcG9rZS1wcm9ncmVzcy1wYXJlbnR7aGVpZ2h0OjRweH19QG1lZGlhIHByaW50ey5iZXNwb2tlLXByb2dyZXNzLXBhcmVudHtkaXNwbGF5Om5vbmV9fS5iZXNwb2tlLXByb2dyZXNzLWJhcnstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjZzIGVhc2U7dHJhbnNpdGlvbjp3aWR0aCAuNnMgZWFzZTtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kOiMwMDg5ZjM7Ym9yZGVyLXJhZGl1czowIDRweCA0cHggMH0uZW1waGF0aWN7YmFja2dyb3VuZDojZWFlYWVhfS5iZXNwb2tlLWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2U7dHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlO29wYWNpdHk6MDt6LWluZGV4Oi0xfS5iZXNwb2tlLWJhY2tkcm9wLWFjdGl2ZXtvcGFjaXR5OjF9cHJle3BhZGRpbmc6MjZweCFpbXBvcnRhbnQ7Ym9yZGVyLXJhZGl1czo4cHh9Ym9keXtmb250LWZhbWlseTpoZWx2ZXRpY2EsYXJpYWwsc2Fucy1zZXJpZjtmb250LXNpemU6MThweDtjb2xvcjojNDA0MDQwfWgxe2ZvbnQtc2l6ZTo3MnB4O2xpbmUtaGVpZ2h0OjgycHg7bGV0dGVyLXNwYWNpbmc6LTJweDttYXJnaW4tYm90dG9tOjE2cHh9aDJ7Zm9udC1zaXplOjQycHg7bGV0dGVyLXNwYWNpbmc6LTFweDttYXJnaW4tYm90dG9tOjhweH1oM3tmb250LXNpemU6MjRweDtmb250LXdlaWdodDo0MDA7bWFyZ2luLWJvdHRvbToyNHB4O2NvbG9yOiM2MDYwNjB9aHJ7dmlzaWJpbGl0eTpoaWRkZW47aGVpZ2h0OjIwcHh9dWx7bGlzdC1zdHlsZTpub25lfWxpe21hcmdpbi1ib3R0b206MTJweH1we21hcmdpbjowIDEwMHB4IDEycHg7bGluZS1oZWlnaHQ6MjJweH1he2NvbG9yOiMwMDg5ZjM7dGV4dC1kZWNvcmF0aW9uOm5vbmV9XCI7XG4gIGluc2VydENzcyhjc3MsIHsgcHJlcGVuZDogdHJ1ZSB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24oZGVjaykge1xuICAgIGNsYXNzZXMoKShkZWNrKTtcblxuICAgIHZhciB3cmFwID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ2Jlc3Bva2UtdGhlbWUtY3ViZS1zbGlkZS1wYXJlbnQnO1xuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbGVtZW50KTtcbiAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIGRlY2suc2xpZGVzLmZvckVhY2god3JhcCk7XG4gIH07XG59O1xuXG59LHtcImJlc3Bva2UtY2xhc3Nlc1wiOjIsXCJpbnNlcnQtY3NzXCI6M31dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY2spIHtcbiAgICB2YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xzKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2Jlc3Bva2UtJyArIGNscyk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbHMpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lXG4gICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnYmVzcG9rZS0nICsgY2xzICsnKFxcXFxzfCQpJywgJ2cnKSwgJyAnKVxuICAgICAgICAgIC50cmltKCk7XG4gICAgICB9LFxuXG4gICAgICBkZWFjdGl2YXRlID0gZnVuY3Rpb24oZWwsIGluZGV4KSB7XG4gICAgICAgIHZhciBhY3RpdmVTbGlkZSA9IGRlY2suc2xpZGVzW2RlY2suc2xpZGUoKV0sXG4gICAgICAgICAgb2Zmc2V0ID0gaW5kZXggLSBkZWNrLnNsaWRlKCksXG4gICAgICAgICAgb2Zmc2V0Q2xhc3MgPSBvZmZzZXQgPiAwID8gJ2FmdGVyJyA6ICdiZWZvcmUnO1xuXG4gICAgICAgIFsnYmVmb3JlKC1cXFxcZCspPycsICdhZnRlcigtXFxcXGQrKT8nLCAnYWN0aXZlJywgJ2luYWN0aXZlJ10ubWFwKHJlbW92ZUNsYXNzLmJpbmQobnVsbCwgZWwpKTtcblxuICAgICAgICBpZiAoZWwgIT09IGFjdGl2ZVNsaWRlKSB7XG4gICAgICAgICAgWydpbmFjdGl2ZScsIG9mZnNldENsYXNzLCBvZmZzZXRDbGFzcyArICctJyArIE1hdGguYWJzKG9mZnNldCldLm1hcChhZGRDbGFzcy5iaW5kKG51bGwsIGVsKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICBhZGRDbGFzcyhkZWNrLnBhcmVudCwgJ3BhcmVudCcpO1xuICAgIGRlY2suc2xpZGVzLm1hcChmdW5jdGlvbihlbCkgeyBhZGRDbGFzcyhlbCwgJ3NsaWRlJyk7IH0pO1xuXG4gICAgZGVjay5vbignYWN0aXZhdGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBkZWNrLnNsaWRlcy5tYXAoZGVhY3RpdmF0ZSk7XG4gICAgICBhZGRDbGFzcyhlLnNsaWRlLCAnYWN0aXZlJyk7XG4gICAgICByZW1vdmVDbGFzcyhlLnNsaWRlLCAnaW5hY3RpdmUnKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbn0se31dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIGluc2VydGVkID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcywgb3B0aW9ucykge1xuICAgIGlmIChpbnNlcnRlZFtjc3NdKSByZXR1cm47XG4gICAgaW5zZXJ0ZWRbY3NzXSA9IHRydWU7XG4gICAgXG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGVsZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICBpZiAoJ3RleHRDb250ZW50JyBpbiBlbGVtKSB7XG4gICAgICBlbGVtLnRleHRDb250ZW50ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9XG4gICAgXG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJlcGVuZCkge1xuICAgICAgICBoZWFkLmluc2VydEJlZm9yZShlbGVtLCBoZWFkLmNoaWxkTm9kZXNbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgfVxufTtcblxufSx7fV19LHt9LFsxXSlcbigxKVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNrKSB7XG4gICAgdmFyIGF4aXMgPSBvcHRpb25zID09ICd2ZXJ0aWNhbCcgPyAnWScgOiAnWCcsXG4gICAgICBzdGFydFBvc2l0aW9uLFxuICAgICAgZGVsdGE7XG5cbiAgICBkZWNrLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICBzdGFydFBvc2l0aW9uID0gZS50b3VjaGVzWzBdWydwYWdlJyArIGF4aXNdO1xuICAgICAgICBkZWx0YSA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZWNrLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZGVsdGEgPSBlLnRvdWNoZXNbMF1bJ3BhZ2UnICsgYXhpc10gLSBzdGFydFBvc2l0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVjay5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPiA1MCkge1xuICAgICAgICBkZWNrW2RlbHRhID4gMCA/ICdwcmV2JyA6ICduZXh0J10oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG4iLCJ2YXIgZnJvbSA9IGZ1bmN0aW9uKG9wdHMsIHBsdWdpbnMpIHtcbiAgdmFyIHBhcmVudCA9IChvcHRzLnBhcmVudCB8fCBvcHRzKS5ub2RlVHlwZSA9PT0gMSA/IChvcHRzLnBhcmVudCB8fCBvcHRzKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0cy5wYXJlbnQgfHwgb3B0cyksXG4gICAgc2xpZGVzID0gW10uZmlsdGVyLmNhbGwodHlwZW9mIG9wdHMuc2xpZGVzID09PSAnc3RyaW5nJyA/IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdHMuc2xpZGVzKSA6IChvcHRzLnNsaWRlcyB8fCBwYXJlbnQuY2hpbGRyZW4pLCBmdW5jdGlvbihlbCkgeyByZXR1cm4gZWwubm9kZU5hbWUgIT09ICdTQ1JJUFQnOyB9KSxcbiAgICBhY3RpdmVTbGlkZSA9IHNsaWRlc1swXSxcbiAgICBsaXN0ZW5lcnMgPSB7fSxcblxuICAgIGFjdGl2YXRlID0gZnVuY3Rpb24oaW5kZXgsIGN1c3RvbURhdGEpIHtcbiAgICAgIGlmICghc2xpZGVzW2luZGV4XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZpcmUoJ2RlYWN0aXZhdGUnLCBjcmVhdGVFdmVudERhdGEoYWN0aXZlU2xpZGUsIGN1c3RvbURhdGEpKTtcbiAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzW2luZGV4XTtcbiAgICAgIGZpcmUoJ2FjdGl2YXRlJywgY3JlYXRlRXZlbnREYXRhKGFjdGl2ZVNsaWRlLCBjdXN0b21EYXRhKSk7XG4gICAgfSxcblxuICAgIHNsaWRlID0gZnVuY3Rpb24oaW5kZXgsIGN1c3RvbURhdGEpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGZpcmUoJ3NsaWRlJywgY3JlYXRlRXZlbnREYXRhKHNsaWRlc1tpbmRleF0sIGN1c3RvbURhdGEpKSAmJiBhY3RpdmF0ZShpbmRleCwgY3VzdG9tRGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2xpZGVzLmluZGV4T2YoYWN0aXZlU2xpZGUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGVwID0gZnVuY3Rpb24ob2Zmc2V0LCBjdXN0b21EYXRhKSB7XG4gICAgICB2YXIgc2xpZGVJbmRleCA9IHNsaWRlcy5pbmRleE9mKGFjdGl2ZVNsaWRlKSArIG9mZnNldDtcblxuICAgICAgZmlyZShvZmZzZXQgPiAwID8gJ25leHQnIDogJ3ByZXYnLCBjcmVhdGVFdmVudERhdGEoYWN0aXZlU2xpZGUsIGN1c3RvbURhdGEpKSAmJiBhY3RpdmF0ZShzbGlkZUluZGV4LCBjdXN0b21EYXRhKTtcbiAgICB9LFxuXG4gICAgb24gPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAobGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgKGxpc3RlbmVyc1tldmVudE5hbWVdID0gW10pKS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBvZmYuYmluZChudWxsLCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgb2ZmID0gZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSAobGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW10pLmZpbHRlcihmdW5jdGlvbihsaXN0ZW5lcikgeyByZXR1cm4gbGlzdGVuZXIgIT09IGNhbGxiYWNrOyB9KTtcbiAgICB9LFxuXG4gICAgZmlyZSA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZXZlbnREYXRhKSB7XG4gICAgICByZXR1cm4gKGxpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdKVxuICAgICAgICAucmVkdWNlKGZ1bmN0aW9uKG5vdENhbmNlbGxlZCwgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm4gbm90Q2FuY2VsbGVkICYmIGNhbGxiYWNrKGV2ZW50RGF0YSkgIT09IGZhbHNlO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlRXZlbnREYXRhID0gZnVuY3Rpb24oZWwsIGV2ZW50RGF0YSkge1xuICAgICAgZXZlbnREYXRhID0gZXZlbnREYXRhIHx8IHt9O1xuICAgICAgZXZlbnREYXRhLmluZGV4ID0gc2xpZGVzLmluZGV4T2YoZWwpO1xuICAgICAgZXZlbnREYXRhLnNsaWRlID0gZWw7XG4gICAgICByZXR1cm4gZXZlbnREYXRhO1xuICAgIH0sXG5cbiAgICBkZWNrID0ge1xuICAgICAgb246IG9uLFxuICAgICAgb2ZmOiBvZmYsXG4gICAgICBmaXJlOiBmaXJlLFxuICAgICAgc2xpZGU6IHNsaWRlLFxuICAgICAgbmV4dDogc3RlcC5iaW5kKG51bGwsIDEpLFxuICAgICAgcHJldjogc3RlcC5iaW5kKG51bGwsIC0xKSxcbiAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgc2xpZGVzOiBzbGlkZXNcbiAgICB9O1xuXG4gIChwbHVnaW5zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKHBsdWdpbikge1xuICAgIHBsdWdpbihkZWNrKTtcbiAgfSk7XG5cbiAgYWN0aXZhdGUoMCk7XG5cbiAgcmV0dXJuIGRlY2s7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZnJvbTogZnJvbVxufTtcbiJdfQ==
