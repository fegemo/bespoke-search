/*!
 * bespoke-search v1.0.0
 *
 * Copyright 2015, Flávio
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.search = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

module.exports = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$showKey = _ref.showKey;
  var showKey = _ref$showKey === undefined ? 'ctrl-f' : _ref$showKey;
  var _ref$dismissKey = _ref.dismissKey;
  var dismissKey = _ref$dismissKey === undefined ? 'escape' : _ref$dismissKey;
  var _ref$triggerKey = _ref.triggerKey;
  var triggerKey = _ref$triggerKey === undefined ? 'enter' : _ref$triggerKey;
  var _ref$nextKey = _ref.nextKey;
  var nextKey = _ref$nextKey === undefined ? ['f3', 'tab'] : _ref$nextKey;
  var _ref$prevKey = _ref.prevKey;
  var prevKey = _ref$prevKey === undefined ? ['shift-f3', 'shift-tab'] : _ref$prevKey;

  var makeArray = function makeArray(obj) {
    return Array.isArray(obj) ? obj : [obj];
  };
  showKey = makeArray(showKey);
  dismissKey = makeArray(dismissKey);
  triggerKey = makeArray(triggerKey);
  nextKey = makeArray(nextKey);
  prevKey = makeArray(prevKey);

  return function (deck) {
    var keymage = require('keymage'),
        searchEl,
        searchInputEl,
        searchResultsCountEl,
        currentResultIndex,
        results = [],
        cachedSlidesText = deck.slides.map(function (slide, i) {
      return { i: i, text: slide.textContent };
    });

    var clearResults = function clearResults() {
      var parentsOfResults = new Set();

      results.forEach(function (r) {
        var originalContent = document.createTextNode(r.el.innerText);
        parentsOfResults.add(r.el.parentNode);
        r.el.parentNode.replaceChild(originalContent, r.el);
      });
      parentsOfResults.forEach(function (p) {
        return p.normalize();
      });

      results.length = 0;
    },
        show = function show(e) {
      e.preventDefault();
      searchEl.classList.add('bespoke-search-searching');
      searchEl.classList.remove('bespoke-search-no-result');
      searchInputEl.focus();
      keymage.pushScope('searching');
      deck.parent.classList.add('bespoke-bullet-off');
    },
        hide = function hide(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      searchInputEl.value = '';
      searchResultsCountEl.innerText = '';
      searchEl.classList.remove('bespoke-search-searching');
      searchEl.classList.remove('bespoke-search-no-result');
      keymage.popScope();
      clearResults();
      deck.parent.classList.remove('bespoke-bullet-off');
    },
        reportResultStats = function reportResultStats() {
      searchResultsCountEl.innerText = results.length > 0 ? currentResultIndex + 1 + '/' + results.length : '';
      searchEl.classList.toggle('bespoke-search-no-result', results.length === 0);
    },
        focusAtResult = function focusAtResult(index) {
      var result = results[index] || {},
          prevResult = results[currentResultIndex] || {},
          slideIndexOfResult = result.slideIndex;
      deck.slide(slideIndexOfResult);

      if (prevResult && prevResult.el) {
        prevResult.el.classList.remove('bespoke-search-result-focused');
      }
      if (result && result.el) {
        result.el.classList.add('bespoke-search-result-focused');
      }

      currentResultIndex = index;
      reportResultStats();
    },
        navigateResult = function navigateResult(direction) {
      var newIndex = (currentResultIndex + direction + results.length) % results.length;
      focusAtResult(newIndex);
    },
        search = function search() {
      var searchPattern = searchInputEl.value.trim();
      if (searchPattern === '') {
        return;
      }

      var searchRegex = new RegExp(searchPattern, 'i'),
          matchedSlides = cachedSlidesText.filter(function (slide) {
        return searchRegex.test(slide.text);
      });

      var searchElement = function searchElement(el, visitFunction) {
        var results = [];

        switch (el.nodeType) {
          case Node.TEXT_NODE:
            if (searchRegex.test(el.data)) {
              results = visitFunction(el);
            }
            break;
          case Node.ELEMENT_NODE:
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Array.from(el.childNodes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _results;

                var child = _step.value;

                (_results = results).push.apply(_results, _toConsumableArray(searchElement(child, visitFunction)));
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            break;
        }

        return results;
      };

      var markResult = function markResult(textNode) {
        var parent = textNode.parentNode,
            frag = (function () {
          var html = textNode.data.replace(new RegExp('(' + searchPattern + ')', 'gi'), '<span class="bespoke-search-result">$1</span>'),
              wrap = document.createElement('div'),
              frag = document.createDocumentFragment();
          wrap.innerHTML = html;
          while (wrap.firstChild) {
            frag.appendChild(wrap.firstChild);
          }
          return frag;
        })();

        var inserted = frag.querySelectorAll('.bespoke-search-result');
        parent.insertBefore(frag, textNode);
        parent.removeChild(textNode);

        // returns an array with the newly created elements
        return Array.from(inserted);
      };

      // find occurrences
      results = matchedSlides.reduce(function (previous, curr) {
        var slideEl = deck.slides[curr.i],
            occurrences = searchElement(slideEl, markResult).map(function (result) {
          return { slideIndex: curr.i, el: result };
        });

        return previous.concat(occurrences);
      }, []);

      // report the number of occurrences
      searchResultsCountEl.innerText = '1/' + results.length;

      // moves to the slide of the first occurrence
      focusAtResult(0);
    },
        createSearchBox = function createSearchBox() {
      searchEl = document.createElement('div');
      searchInputEl = document.createElement('input');
      searchResultsCountEl = document.createElement('span');

      searchEl.id = 'bespoke-search';
      searchInputEl.id = 'bespoke-search-input';
      searchInputEl.type = 'search';
      searchResultsCountEl.id = 'bespoke-search-results-count';
      searchResultsCountEl.innerText = '';
      searchEl.appendChild(searchInputEl);
      searchEl.appendChild(searchResultsCountEl);

      deck.parent.parentNode.appendChild(searchEl);
    };

    showKey.forEach(function (key) {
      return keymage(key, show);
    });
    dismissKey.forEach(function (key) {
      return keymage('searching', key, hide);
    });
    triggerKey.forEach(function (key) {
      return keymage('searching', key, function () {
        clearResults();search();return false;
      });
    });
    nextKey.forEach(function (key) {
      return keymage('searching', key, navigateResult.bind(key, +1), { preventDefault: true });
    });
    prevKey.forEach(function (key) {
      return keymage('searching', key, navigateResult.bind(key, -1), { preventDefault: true });
    });

    deck.parent.parentNode.addEventListener('keydown', function (e) {
      if (e.target.id === 'bespoke-search-input') {
        if (e.which >= 32) {
          e.stopPropagation();
        }
      }
    });
    createSearchBox();
  };
};

},{"keymage":2}],2:[function(require,module,exports){
// keymage.js - Javascript keyboard event handling
// http://github.com/piranha/keymage
//
// (c) 2012 Alexander Solovyov
// under terms of ISC License

(function(define, undefined) {
define(function() {
    var VERSION = '1.0.1';
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
        '-': 109, 'minus': 109,
        ';': 186,
        '=': 187,
        ',': 188,
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
        var bits = keystring.split('-');
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOi9Vc2Vycy9GbGF2aW8vRG9jdW1lbnRzL0dpdEh1Yi9iZXNwb2tlLXNlYXJjaC9saWIvYmVzcG9rZS1zZWFyY2guanMuZXM2Iiwibm9kZV9tb2R1bGVzL2tleW1hZ2Uva2V5bWFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFlBTVA7bUVBQUosRUFBRTs7MEJBTEosT0FBTztNQUFQLE9BQU8sZ0NBQUcsUUFBUTs2QkFDbEIsVUFBVTtNQUFWLFVBQVUsbUNBQUcsUUFBUTs2QkFDckIsVUFBVTtNQUFWLFVBQVUsbUNBQUcsT0FBTzswQkFDcEIsT0FBTztNQUFQLE9BQU8sZ0NBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDOzBCQUN2QixPQUFPO01BQVAsT0FBTyxnQ0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7O0FBR3JDLE1BQUksU0FBUyxHQUFHLFNBQVosU0FBUyxDQUFJLEdBQUc7V0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUM7QUFDeEQsU0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixZQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLFlBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsU0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixTQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUvQixTQUFPLFVBQVMsSUFBSSxFQUFFO0FBQ3BCLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDOUIsUUFBUTtRQUNSLGFBQWE7UUFDYixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLE9BQU8s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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih7XG4gICAgc2hvd0tleSA9ICdjdHJsLWYnLFxuICAgIGRpc21pc3NLZXkgPSAnZXNjYXBlJyxcbiAgICB0cmlnZ2VyS2V5ID0gJ2VudGVyJyxcbiAgICBuZXh0S2V5ID0gWydmMycsICd0YWInXSxcbiAgICBwcmV2S2V5ID0gWydzaGlmdC1mMycsICdzaGlmdC10YWInXVxuICB9ID0ge30pIHtcblxuICB2YXIgbWFrZUFycmF5ID0gKG9iaikgPT4gQXJyYXkuaXNBcnJheShvYmopID8gb2JqIDogW29ial07XG4gICAgc2hvd0tleSA9IG1ha2VBcnJheShzaG93S2V5KTtcbiAgICBkaXNtaXNzS2V5ID0gbWFrZUFycmF5KGRpc21pc3NLZXkpO1xuICAgIHRyaWdnZXJLZXkgPSBtYWtlQXJyYXkodHJpZ2dlcktleSk7XG4gICAgbmV4dEtleSA9IG1ha2VBcnJheShuZXh0S2V5KTtcbiAgICBwcmV2S2V5ID0gbWFrZUFycmF5KHByZXZLZXkpO1xuXG4gIHJldHVybiBmdW5jdGlvbihkZWNrKSB7XG4gICAgdmFyIGtleW1hZ2UgPSByZXF1aXJlKCdrZXltYWdlJyksXG4gICAgICBzZWFyY2hFbCxcbiAgICAgIHNlYXJjaElucHV0RWwsXG4gICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbCxcbiAgICAgIGN1cnJlbnRSZXN1bHRJbmRleCxcbiAgICAgIHJlc3VsdHMgPSBbXSxcbiAgICAgIGNhY2hlZFNsaWRlc1RleHQgPSBkZWNrLnNsaWRlcy5tYXAoKHNsaWRlLCBpKSA9PiB7IHJldHVybiB7aTogaSwgdGV4dDogc2xpZGUudGV4dENvbnRlbnR9IH0pO1xuXG4gICAgbGV0IGNsZWFyUmVzdWx0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGFyZW50c09mUmVzdWx0cyA9IG5ldyBTZXQoKTtcblxuICAgICAgICByZXN1bHRzLmZvckVhY2gociA9PiB7XG4gICAgICAgICAgdmFyIG9yaWdpbmFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHIuZWwuaW5uZXJUZXh0KTtcbiAgICAgICAgICBwYXJlbnRzT2ZSZXN1bHRzLmFkZChyLmVsLnBhcmVudE5vZGUpO1xuICAgICAgICAgIHIuZWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob3JpZ2luYWxDb250ZW50LCByLmVsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhcmVudHNPZlJlc3VsdHMuZm9yRWFjaChwID0+IHAubm9ybWFsaXplKCkpO1xuXG4gICAgICAgIHJlc3VsdHMubGVuZ3RoID0gMDtcbiAgICAgIH0sXG5cbiAgICAgIHNob3cgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2VhcmNoRWwuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1zZWFyY2gtc2VhcmNoaW5nJyk7XG4gICAgICAgIHNlYXJjaEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jlc3Bva2Utc2VhcmNoLW5vLXJlc3VsdCcpO1xuICAgICAgICBzZWFyY2hJbnB1dEVsLmZvY3VzKCk7XG4gICAgICAgIGtleW1hZ2UucHVzaFNjb3BlKCdzZWFyY2hpbmcnKTtcbiAgICAgICAgZGVjay5wYXJlbnQuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1idWxsZXQtb2ZmJyk7XG4gICAgICB9LFxuXG4gICAgICBoaWRlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgc2VhcmNoSW5wdXRFbC52YWx1ZSA9ICcnO1xuICAgICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbC5pbm5lclRleHQgPSAnJztcbiAgICAgICAgc2VhcmNoRWwuY2xhc3NMaXN0LnJlbW92ZSgnYmVzcG9rZS1zZWFyY2gtc2VhcmNoaW5nJyk7XG4gICAgICAgIHNlYXJjaEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jlc3Bva2Utc2VhcmNoLW5vLXJlc3VsdCcpO1xuICAgICAgICBrZXltYWdlLnBvcFNjb3BlKCk7XG4gICAgICAgIGNsZWFyUmVzdWx0cygpO1xuICAgICAgICBkZWNrLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdiZXNwb2tlLWJ1bGxldC1vZmYnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlcG9ydFJlc3VsdFN0YXRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlYXJjaFJlc3VsdHNDb3VudEVsLmlubmVyVGV4dCA9IHJlc3VsdHMubGVuZ3RoID4gMCA/XG4gICAgICAgICAgYCR7Y3VycmVudFJlc3VsdEluZGV4KzF9LyR7cmVzdWx0cy5sZW5ndGh9YCA6ICcnO1xuICAgICAgICBzZWFyY2hFbC5jbGFzc0xpc3QudG9nZ2xlKCdiZXNwb2tlLXNlYXJjaC1uby1yZXN1bHQnLCByZXN1bHRzLmxlbmd0aCA9PT0gMCk7XG4gICAgICB9LFxuXG4gICAgICBmb2N1c0F0UmVzdWx0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaW5kZXhdIHx8IHt9LFxuICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2N1cnJlbnRSZXN1bHRJbmRleF0gfHwge30sXG4gICAgICAgICAgc2xpZGVJbmRleE9mUmVzdWx0ID0gKHJlc3VsdCkuc2xpZGVJbmRleDtcbiAgICAgICAgZGVjay5zbGlkZShzbGlkZUluZGV4T2ZSZXN1bHQpO1xuXG4gICAgICAgIGlmIChwcmV2UmVzdWx0ICYmIHByZXZSZXN1bHQuZWwpIHtcbiAgICAgICAgICBwcmV2UmVzdWx0LmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jlc3Bva2Utc2VhcmNoLXJlc3VsdC1mb2N1c2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuZWwpIHtcbiAgICAgICAgICByZXN1bHQuZWwuY2xhc3NMaXN0LmFkZCgnYmVzcG9rZS1zZWFyY2gtcmVzdWx0LWZvY3VzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRSZXN1bHRJbmRleCA9IGluZGV4O1xuICAgICAgICByZXBvcnRSZXN1bHRTdGF0cygpO1xuICAgICAgfSxcblxuICAgICAgbmF2aWdhdGVSZXN1bHQgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIG5ld0luZGV4ID0gKGN1cnJlbnRSZXN1bHRJbmRleCArIGRpcmVjdGlvbiArIHJlc3VsdHMubGVuZ3RoKSAlIHJlc3VsdHMubGVuZ3RoO1xuICAgICAgICBmb2N1c0F0UmVzdWx0KG5ld0luZGV4KTtcbiAgICAgIH0sXG5cbiAgICAgIHNlYXJjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VhcmNoUGF0dGVybiA9IHNlYXJjaElucHV0RWwudmFsdWUudHJpbSgpO1xuICAgICAgICBpZiAoc2VhcmNoUGF0dGVybiA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VhcmNoUmVnZXggPSBuZXcgUmVnRXhwKHNlYXJjaFBhdHRlcm4sICdpJyksXG4gICAgICAgICAgbWF0Y2hlZFNsaWRlcyA9IGNhY2hlZFNsaWRlc1RleHQuZmlsdGVyKHNsaWRlID0+IHNlYXJjaFJlZ2V4LnRlc3Qoc2xpZGUudGV4dCkpO1xuXG5cbiAgICAgICAgbGV0IHNlYXJjaEVsZW1lbnQgPSBmdW5jdGlvbiBzZWFyY2hFbGVtZW50KGVsLCB2aXNpdEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgIHN3aXRjaCAoZWwubm9kZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTm9kZS5URVhUX05PREU6XG4gICAgICAgICAgICAgIGlmIChzZWFyY2hSZWdleC50ZXN0KGVsLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHZpc2l0RnVuY3Rpb24oZWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpcbiAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5zZWFyY2hFbGVtZW50KGNoaWxkLCB2aXNpdEZ1bmN0aW9uKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG1hcmtSZXN1bHQgPSBmdW5jdGlvbih0ZXh0Tm9kZSkge1xuICAgICAgICAgIHZhciBwYXJlbnQgPSB0ZXh0Tm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgZnJhZyA9IChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHRleHROb2RlLmRhdGEucmVwbGFjZShuZXcgUmVnRXhwKGAoJHtzZWFyY2hQYXR0ZXJufSlgLCAnZ2knKSwgJzxzcGFuIGNsYXNzPVwiYmVzcG9rZS1zZWFyY2gtcmVzdWx0XCI+JDE8L3NwYW4+JyksXG4gICAgICAgICAgICAgICAgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgIHdyYXAuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgICAgd2hpbGUgKHdyYXAuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQod3JhcC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZnJhZztcbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICBsZXQgaW5zZXJ0ZWQgPSBmcmFnLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iZXNwb2tlLXNlYXJjaC1yZXN1bHQnKTtcbiAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGZyYWcsIHRleHROb2RlKTtcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgICAgICAgLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBuZXdseSBjcmVhdGVkIGVsZW1lbnRzXG4gICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oaW5zZXJ0ZWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGZpbmQgb2NjdXJyZW5jZXNcbiAgICAgICAgcmVzdWx0cyA9IG1hdGNoZWRTbGlkZXMucmVkdWNlKChwcmV2aW91cywgY3VycikgPT4ge1xuICAgICAgICAgIHZhciBzbGlkZUVsID0gZGVjay5zbGlkZXNbY3Vyci5pXSxcbiAgICAgICAgICAgIG9jY3VycmVuY2VzID0gc2VhcmNoRWxlbWVudChzbGlkZUVsLCBtYXJrUmVzdWx0KS5tYXAocmVzdWx0ID0+ICh7IHNsaWRlSW5kZXg6IGN1cnIuaSwgZWw6IHJlc3VsdCB9KSk7XG5cbiAgICAgICAgICByZXR1cm4gcHJldmlvdXMuY29uY2F0KG9jY3VycmVuY2VzKTtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIC8vIHJlcG9ydCB0aGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzXG4gICAgICAgIHNlYXJjaFJlc3VsdHNDb3VudEVsLmlubmVyVGV4dCA9IGAxLyR7cmVzdWx0cy5sZW5ndGh9YDtcblxuICAgICAgICAvLyBtb3ZlcyB0byB0aGUgc2xpZGUgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcbiAgICAgICAgZm9jdXNBdFJlc3VsdCgwKTtcbiAgICAgIH0sXG5cbiAgICAgIGNyZWF0ZVNlYXJjaEJveCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWFyY2hFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzZWFyY2hJbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgc2VhcmNoUmVzdWx0c0NvdW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgc2VhcmNoRWwuaWQgPSAnYmVzcG9rZS1zZWFyY2gnO1xuICAgICAgICBzZWFyY2hJbnB1dEVsLmlkID0gJ2Jlc3Bva2Utc2VhcmNoLWlucHV0JztcbiAgICAgICAgc2VhcmNoSW5wdXRFbC50eXBlID0gJ3NlYXJjaCc7XG4gICAgICAgIHNlYXJjaFJlc3VsdHNDb3VudEVsLmlkID0gJ2Jlc3Bva2Utc2VhcmNoLXJlc3VsdHMtY291bnQnO1xuICAgICAgICBzZWFyY2hSZXN1bHRzQ291bnRFbC5pbm5lclRleHQgPSAnJztcbiAgICAgICAgc2VhcmNoRWwuYXBwZW5kQ2hpbGQoc2VhcmNoSW5wdXRFbCk7XG4gICAgICAgIHNlYXJjaEVsLmFwcGVuZENoaWxkKHNlYXJjaFJlc3VsdHNDb3VudEVsKTtcblxuICAgICAgICBkZWNrLnBhcmVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHNlYXJjaEVsKTtcbiAgICAgIH07XG5cblxuICAgIHNob3dLZXkuZm9yRWFjaCgoa2V5KSA9PiBrZXltYWdlKGtleSwgc2hvdykpO1xuICAgIGRpc21pc3NLZXkuZm9yRWFjaCgoa2V5KSA9PiBrZXltYWdlKCdzZWFyY2hpbmcnLCBrZXksIGhpZGUpKTtcbiAgICB0cmlnZ2VyS2V5LmZvckVhY2goKGtleSkgPT4ga2V5bWFnZSgnc2VhcmNoaW5nJywga2V5LCAoKSA9PiB7IGNsZWFyUmVzdWx0cygpOyBzZWFyY2goKTsgcmV0dXJuIGZhbHNlOyB9KSk7XG4gICAgbmV4dEtleS5mb3JFYWNoKChrZXkpID0+IGtleW1hZ2UoJ3NlYXJjaGluZycsIGtleSwgbmF2aWdhdGVSZXN1bHQuYmluZChrZXksICsxKSwge3ByZXZlbnREZWZhdWx0OiB0cnVlfSkpO1xuICAgIHByZXZLZXkuZm9yRWFjaCgoa2V5KSA9PiBrZXltYWdlKCdzZWFyY2hpbmcnLCBrZXksIG5hdmlnYXRlUmVzdWx0LmJpbmQoa2V5LCAtMSksIHtwcmV2ZW50RGVmYXVsdDogdHJ1ZX0pKTtcblxuICAgIGRlY2sucGFyZW50LnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ2Jlc3Bva2Utc2VhcmNoLWlucHV0Jykge1xuICAgICAgICBpZiAoZS53aGljaCA+PSAzMikge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjcmVhdGVTZWFyY2hCb3goKTtcbiAgfTtcbn07XG4iLCIvLyBrZXltYWdlLmpzIC0gSmF2YXNjcmlwdCBrZXlib2FyZCBldmVudCBoYW5kbGluZ1xuLy8gaHR0cDovL2dpdGh1Yi5jb20vcGlyYW5oYS9rZXltYWdlXG4vL1xuLy8gKGMpIDIwMTIgQWxleGFuZGVyIFNvbG92eW92XG4vLyB1bmRlciB0ZXJtcyBvZiBJU0MgTGljZW5zZVxuXG4oZnVuY3Rpb24oZGVmaW5lLCB1bmRlZmluZWQpIHtcbmRlZmluZShmdW5jdGlvbigpIHtcbiAgICB2YXIgVkVSU0lPTiA9ICcxLjAuMSc7XG4gICAgdmFyIGlzT3N4ID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgfm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTWFjIE9TIFgnKTtcblxuICAgIC8vIERlZmluaW5nIGFsbCBrZXlzXG4gICAgdmFyIE1PRFBST1BTID0gWydzaGlmdEtleScsICdjdHJsS2V5JywgJ2FsdEtleScsICdtZXRhS2V5J107XG4gICAgdmFyIE1PRFMgPSB7XG4gICAgICAgICdzaGlmdCc6ICdzaGlmdCcsXG4gICAgICAgICdjdHJsJzogJ2N0cmwnLCAnY29udHJvbCc6ICdjdHJsJyxcbiAgICAgICAgJ2FsdCc6ICdhbHQnLCAnb3B0aW9uJzogJ2FsdCcsXG4gICAgICAgICd3aW4nOiAnbWV0YScsICdjbWQnOiAnbWV0YScsICdzdXBlcic6ICdtZXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ21ldGEnOiAnbWV0YScsXG4gICAgICAgIC8vIGRlZmF1bHQgbW9kaWZpZXIgZm9yIG9zIHggaXMgY21kIGFuZCBmb3Igb3RoZXJzIGlzIGN0cmxcbiAgICAgICAgJ2RlZm1vZCc6ICBpc09zeCA/ICdtZXRhJyA6ICdjdHJsJ1xuICAgICAgICB9O1xuICAgIHZhciBNT0RPUkRFUiA9IFsnc2hpZnQnLCAnY3RybCcsICdhbHQnLCAnbWV0YSddO1xuICAgIHZhciBNT0ROVU1TID0gWzE2LCAxNywgMTgsIDkxXTtcblxuICAgIHZhciBLRVlTID0ge1xuICAgICAgICAnYmFja3NwYWNlJzogOCxcbiAgICAgICAgJ3RhYic6IDksXG4gICAgICAgICdlbnRlcic6IDEzLCAncmV0dXJuJzogMTMsXG4gICAgICAgICdwYXVzZSc6IDE5LFxuICAgICAgICAnY2Fwcyc6IDIwLCAnY2Fwc2xvY2snOiAyMCxcbiAgICAgICAgJ2VzY2FwZSc6IDI3LCAnZXNjJzogMjcsXG4gICAgICAgICdzcGFjZSc6IDMyLFxuICAgICAgICAncGd1cCc6IDMzLCAncGFnZXVwJzogMzMsXG4gICAgICAgICdwZ2Rvd24nOiAzNCwgJ3BhZ2Vkb3duJzogMzQsXG4gICAgICAgICdlbmQnOiAzNSxcbiAgICAgICAgJ2hvbWUnOiAzNixcbiAgICAgICAgJ2lucyc6IDQ1LCAnaW5zZXJ0JzogNDUsXG4gICAgICAgICdkZWwnOiA0NiwgJ2RlbGV0ZSc6IDQ2LFxuXG4gICAgICAgICdsZWZ0JzogMzcsXG4gICAgICAgICd1cCc6IDM4LFxuICAgICAgICAncmlnaHQnOiAzOSxcbiAgICAgICAgJ2Rvd24nOiA0MCxcblxuICAgICAgICAnKic6IDEwNixcbiAgICAgICAgJysnOiAxMDcsICdwbHVzJzogMTA3LFxuICAgICAgICAnLSc6IDEwOSwgJ21pbnVzJzogMTA5LFxuICAgICAgICAnOyc6IDE4NixcbiAgICAgICAgJz0nOiAxODcsXG4gICAgICAgICcsJzogMTg4LFxuICAgICAgICAnLic6IDE5MCxcbiAgICAgICAgJy8nOiAxOTEsXG4gICAgICAgICdgJzogMTkyLFxuICAgICAgICAnWyc6IDIxOSxcbiAgICAgICAgJ1xcXFwnOiAyMjAsXG4gICAgICAgICddJzogMjIxLFxuICAgICAgICBcIidcIjogMjIyXG4gICAgfTtcblxuICAgIHZhciBpO1xuICAgIC8vIG51bXBhZFxuICAgIGZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIEtFWVNbJ251bS0nICsgaV0gPSBpICsgOTU7XG4gICAgfVxuICAgIC8vIHRvcCByb3cgMC05XG4gICAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgS0VZU1tpLnRvU3RyaW5nKCldID0gaSArIDQ4O1xuICAgIH1cbiAgICAvLyBmMS1mMjRcbiAgICBmb3IgKGkgPSAxOyBpIDwgMjU7IGkrKykge1xuICAgICAgICBLRVlTWydmJyArIGldID0gaSArIDExMTtcbiAgICB9XG4gICAgLy8gYWxwaGFiZXRcbiAgICBmb3IgKGkgPSA2NTsgaSA8IDkxOyBpKyspIHtcbiAgICAgICAgS0VZU1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpLnRvTG93ZXJDYXNlKCldID0gaTtcbiAgICB9XG5cbiAgICAvLyBSZXZlcnNlIGtleSBjb2Rlc1xuICAgIHZhciBLRVlSRVYgPSB7fTtcbiAgICBmb3IgKHZhciBrIGluIEtFWVMpIHtcbiAgICAgICAgdmFyIHZhbCA9IEtFWVNba107XG4gICAgICAgIGlmICghS0VZUkVWW3ZhbF0gfHwgS0VZUkVWW3ZhbF0ubGVuZ3RoIDwgay5sZW5ndGgpIHtcbiAgICAgICAgICAgIEtFWVJFVlt2YWxdID0gaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWN0dWFsIHdvcmsgaXMgZG9uZSBoZXJlXG5cbiAgICB2YXIgY3VycmVudFNjb3BlID0gJyc7XG4gICAgdmFyIGFsbENoYWlucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VLZXlTdHJpbmcoa2V5c3RyaW5nKSB7XG4gICAgICAgIHZhciBiaXRzID0ga2V5c3RyaW5nLnNwbGl0KCctJyk7XG4gICAgICAgIHZhciBidXR0b24gPSBiaXRzW2JpdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBrZXkgPSB7Y29kZTogS0VZU1tidXR0b25dfTtcblxuICAgICAgICBpZiAoIWtleS5jb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyAnVW5rbm93biBrZXkgXCInICsgYnV0dG9uICsgJ1wiIGluIGtleXN0cmluZyBcIicgK1xuICAgICAgICAgICAgICAgIGtleXN0cmluZyArICdcIic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbW9kO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBidXR0b24gPSBiaXRzW2ldO1xuICAgICAgICAgICAgbW9kID0gTU9EU1tidXR0b25dO1xuICAgICAgICAgICAgaWYgKCFtb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ1Vua25vd24gbW9kaWZpZXIgXCInICsgYnV0dG9uICsgJ1wiIGluIGtleXN0cmluZyBcIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5c3RyaW5nICsgJ1wiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleVttb2RdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5S2V5KGtleSkge1xuICAgICAgICB2YXIgcyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1PRE9SREVSLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoa2V5W01PRE9SREVSW2ldXSkge1xuICAgICAgICAgICAgICAgIHMgKz0gTU9ET1JERVJbaV0gKyAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcyArPSBLRVlSRVZba2V5LmNvZGVdO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVLZXlDaGFpbihrZXljaGFpblN0cmluZykge1xuICAgICAgICB2YXIga2V5Y2hhaW4gPSBbXTtcbiAgICAgICAgdmFyIGtleXMgPSBrZXljaGFpblN0cmluZy5zcGxpdCgnICcpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnNlS2V5U3RyaW5nKGtleXNbaV0pO1xuICAgICAgICAgICAga2V5ID0gc3RyaW5naWZ5S2V5KGtleSk7XG4gICAgICAgICAgICBrZXljaGFpbi5wdXNoKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBrZXljaGFpbi5vcmlnaW5hbCA9IGtleWNoYWluU3RyaW5nO1xuICAgICAgICByZXR1cm4ga2V5Y2hhaW47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXZlbnRLZXlTdHJpbmcoZSkge1xuICAgICAgICB2YXIga2V5ID0ge2NvZGU6IGUua2V5Q29kZX07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTU9EUFJPUFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtb2QgPSBNT0RQUk9QU1tpXTtcbiAgICAgICAgICAgIGlmIChlW21vZF0pIHtcbiAgICAgICAgICAgICAgICBrZXlbbW9kLnNsaWNlKDAsIG1vZC5sZW5ndGggLSAzKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlLZXkoa2V5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXROZXN0ZWRDaGFpbnMoY2hhaW5zLCBzY29wZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYml0ID0gc2NvcGVbaV07XG5cbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgICBjaGFpbnMgPSBjaGFpbnNbYml0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjaGFpbnMpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhaW5zO1xuICAgIH1cblxuICAgIHZhciBzZXF1ZW5jZSA9IFtdO1xuICAgIGZ1bmN0aW9uIGRpc3BhdGNoKGUpIHtcbiAgICAgICAgLy8gU2tpcCBhbGwgbW9kaWZpZXJzXG4gICAgICAgIGlmICh+TU9ETlVNUy5pbmRleE9mKGUua2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZXEgPSBzZXF1ZW5jZS5zbGljZSgpO1xuICAgICAgICBzZXEucHVzaChldmVudEtleVN0cmluZyhlKSk7XG4gICAgICAgIHZhciBzY29wZSA9IGN1cnJlbnRTY29wZS5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgbWF0Y2hlZCwgY2hhaW5zLCBrZXk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHNjb3BlLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNoYWlucyA9IGdldE5lc3RlZENoYWlucyhhbGxDaGFpbnMsIHNjb3BlLnNsaWNlKDAsIGkpKTtcbiAgICAgICAgICAgIGlmICghY2hhaW5zKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VxLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gc2VxW2pdO1xuICAgICAgICAgICAgICAgIGlmICghY2hhaW5zW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhaW5zID0gY2hhaW5zW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVmaW5pdGlvblNjb3BlID0gc2NvcGUuc2xpY2UoMCwgaSkuam9pbignLicpO1xuICAgICAgICB2YXIgcHJldmVudERlZmF1bHQgPSBjaGFpbnMucHJldmVudERlZmF1bHQ7XG5cbiAgICAgICAgLy8gcGFydGlhbCBtYXRjaCwgc2F2ZSB0aGUgc2VxdWVuY2VcbiAgICAgICAgaWYgKG1hdGNoZWQgJiYgIWNoYWlucy5oYW5kbGVycykge1xuICAgICAgICAgICAgc2VxdWVuY2UgPSBzZXE7XG4gICAgICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoYWlucy5oYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gY2hhaW5zLmhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gaGFuZGxlci5fa2V5bWFnZTtcblxuICAgICAgICAgICAgICAgIHZhciByZXMgPSBoYW5kbGVyLmNhbGwob3B0aW9ucy5jb250ZXh0LCBlLCB7XG4gICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0OiBvcHRpb25zLm9yaWdpbmFsLFxuICAgICAgICAgICAgICAgICAgICBzY29wZTogY3VycmVudFNjb3BlLFxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uU2NvcGU6IGRlZmluaXRpb25TY29wZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgcHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVpdGhlciBtYXRjaGVkIG9yIG5vdCwgZHJvcCB0aGUgc2VxdWVuY2VcbiAgICAgICAgc2VxdWVuY2UgPSBbXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIYW5kbGVycyhzY29wZSwga2V5Y2hhaW4sIGZuKSB7XG4gICAgICAgIHZhciBiaXRzID0gc2NvcGUuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIGNoYWlucyA9IGFsbENoYWlucztcbiAgICAgICAgYml0cyA9IGJpdHMuY29uY2F0KGtleWNoYWluKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJpdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYml0ID0gYml0c1tpXTtcbiAgICAgICAgICAgIGlmICghYml0KSBjb250aW51ZTtcblxuICAgICAgICAgICAgY2hhaW5zID0gY2hhaW5zW2JpdF0gfHwgKGNoYWluc1tiaXRdID0ge30pO1xuICAgICAgICAgICAgaWYgKGZuICYmIGZuLl9rZXltYWdlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgY2hhaW5zLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPT09IGwgLSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZXJzID0gY2hhaW5zLmhhbmRsZXJzIHx8IChjaGFpbnMuaGFuZGxlcnMgPSBbXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzaWduS2V5KHNjb3BlLCBrZXljaGFpbiwgZm4pIHtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gZ2V0SGFuZGxlcnMoc2NvcGUsIGtleWNoYWluLCBmbik7XG4gICAgICAgIGhhbmRsZXJzLnB1c2goZm4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuYXNzaWduS2V5KHNjb3BlLCBrZXljaGFpbiwgZm4pIHtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gZ2V0SGFuZGxlcnMoc2NvcGUsIGtleWNoYWluKTtcbiAgICAgICAgdmFyIGlkeCA9IGhhbmRsZXJzLmluZGV4T2YoZm4pO1xuICAgICAgICBpZiAofmlkeCkge1xuICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZWQoc2NvcGUsIGtleWNoYWluLCBmbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAoa2V5Y2hhaW4gPT09IHVuZGVmaW5lZCAmJiBmbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oa2V5Y2hhaW4sIGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleW1hZ2Uoc2NvcGUsIGtleWNoYWluLCBmbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBrZXljaGFpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGZuO1xuICAgICAgICAgICAgZm4gPSBrZXljaGFpbjtcbiAgICAgICAgICAgIGtleWNoYWluID0gc2NvcGU7XG4gICAgICAgICAgICBzY29wZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vcm1hbGl6ZWQgPSBub3JtYWxpemVLZXlDaGFpbihrZXljaGFpbik7XG5cbiAgICAgICAgcmV0dXJuIFtzY29wZSwgbm9ybWFsaXplZCwgZm4sIG9wdGlvbnNdO1xuICAgIH1cblxuICAgIC8vIG9wdGlvbmFsIGFyZ3VtZW50czogc2NvcGUsIG9wdGlvbnMuXG4gICAgZnVuY3Rpb24ga2V5bWFnZShzY29wZSwga2V5Y2hhaW4sIGZuLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBhcmdzID0gcGFyc2VkKHNjb3BlLCBrZXljaGFpbiwgZm4sIG9wdGlvbnMpO1xuICAgICAgICBmbiA9IGFyZ3NbMl07XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzWzNdO1xuICAgICAgICBmbi5fa2V5bWFnZSA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGZuLl9rZXltYWdlLm9yaWdpbmFsID0ga2V5Y2hhaW47XG4gICAgICAgIGFzc2lnbktleS5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG5cbiAgICBrZXltYWdlLnVuYmluZCA9IGZ1bmN0aW9uKHNjb3BlLCBrZXljaGFpbiwgZm4pIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBwYXJzZWQoc2NvcGUsIGtleWNoYWluLCBmbik7XG4gICAgICAgIHVuYXNzaWduS2V5LmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH07XG5cbiAgICBrZXltYWdlLnBhcnNlID0gcGFyc2VLZXlTdHJpbmc7XG4gICAga2V5bWFnZS5zdHJpbmdpZnkgPSBzdHJpbmdpZnlLZXk7XG5cbiAgICBrZXltYWdlLmJpbmRpbmdzID0gYWxsQ2hhaW5zO1xuXG4gICAga2V5bWFnZS5zZXRTY29wZSA9IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICAgIGN1cnJlbnRTY29wZSA9IHNjb3BlID8gc2NvcGUgOiAnJztcbiAgICB9O1xuXG4gICAga2V5bWFnZS5nZXRTY29wZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY3VycmVudFNjb3BlOyB9O1xuXG4gICAga2V5bWFnZS5wdXNoU2NvcGUgPSBmdW5jdGlvbihzY29wZSkge1xuICAgICAgICBjdXJyZW50U2NvcGUgPSAoY3VycmVudFNjb3BlID8gY3VycmVudFNjb3BlICsgJy4nIDogJycpICsgc2NvcGU7XG4gICAgICAgIHJldHVybiBjdXJyZW50U2NvcGU7XG4gICAgfTtcblxuICAgIGtleW1hZ2UucG9wU2NvcGUgPSBmdW5jdGlvbihzY29wZSkge1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBpZiAoIXNjb3BlKSB7XG4gICAgICAgICAgICBpID0gY3VycmVudFNjb3BlLmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgICAgICBzY29wZSA9IGN1cnJlbnRTY29wZS5zbGljZShpICsgMSk7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUgPSBpID09IC0xID8gJycgOiBjdXJyZW50U2NvcGUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50U2NvcGUgPSBjdXJyZW50U2NvcGUucmVwbGFjZShcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoJyhefFxcXFwuKScgKyBzY29wZSArICcoXFxcXC58JCkuKicpLCAnJyk7XG4gICAgICAgIHJldHVybiBzY29wZTtcbiAgICB9O1xuXG4gICAga2V5bWFnZS52ZXJzaW9uID0gVkVSU0lPTjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZGlzcGF0Y2gsIGZhbHNlKTtcblxuICAgIHJldHVybiBrZXltYWdlO1xufSk7XG59KSh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyA/IGRlZmluZSA6IGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmtleW1hZ2UgPSBmYWN0b3J5KCk7XG4gICAgfVxufSk7XG4iXX0=
