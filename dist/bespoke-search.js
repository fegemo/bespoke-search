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
