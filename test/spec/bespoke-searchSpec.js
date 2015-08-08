Function.prototype.bind = Function.prototype.bind || require('function-bind');

require("babel/polyfill");

var bespoke = require('bespoke'),
  simulant = require('simulant'),
  search = require('../../dist/bespoke-search.js'),

  deck,
  pressKeyCode = function(keyCode) {
    // key down
    simulant.fire(document, 'keydown', { keyCode: keyCode });

    // key up after some time
    setTimeout(function() {
      simulant.fire(document, 'keyup', { keyCode: keyCode });
    }, 500);
  },
  pressKeyCombination = function(special, keyCode) {
    if (typeof keyCode === 'undefined') keyCode = special;
    if (typeof keyCode === 'string') keyCode = keyCode.toUpperCase().charCodeAt(0);
    var options = {
      keyCode: keyCode
    };
    if (typeof special === 'string') {
      ['ctrl', 'alt', 'shift'].forEach(function(sp) {
        if (special.indexOf(sp) !== -1) {
          options[sp + 'Key'] = true;
        }
      });
    }

    // key down
    simulant.fire(document, simulant('keydown', options));

    // key up after some time
    setTimeout(function() {
      simulant.fire(document, simulant('keyup', options));
    }, 500);
  },
  resetDom = function() {
    while (document.body.lastChild) {
      document.body.removeChild(document.body.lastChild);
    }
  },
  createEmptyDom = function() {
    var parent = document.createElement('article');
    parent.appendChild(document.createElement('section'));
    parent.appendChild(document.createElement('section'));
    document.body.appendChild(parent);

    return parent;
  },
  createSingleResultDom = function() {
    var parent = document.createElement('article'),
      section = document.createElement('section');

    section.innerHTML = '<h1>Hobbit Meals</h1>';
    section.innerHTML += '<ul><li><span>7:00am – Breakfast</span></li>' +
                         '<li><span>9:00am – Second Breakfast</span></li>' +
                         '<li><span>11:00am – Elevenses</span></li>' +
                         '<li><span>1:00pm – Luncheon</span></li>' +
                         '<li><span>4:00pm – Afternoon Tea</span></li>' +
                         '<li><span>6:00pm – Dinner</span></li>' +
                         '<li><span>8:00pm – Supper&nbsp;</span></li>' +
                         '</ul>';
    parent.appendChild(document.createElement('section'));
    parent.appendChild(section);
    document.body.appendChild(parent);

    return parent;
  },
  createMultipleResultsDom = function() {
    var parent = createSingleResultDom(),
      cloned = parent.lastChild.cloneNode(true);
    parent.appendChild(cloned);

    return parent;
  };

describe('bespoke-search', function() {

  describe('search box', function() {

    beforeEach(function() {
      var parent = createEmptyDom();
      deck = bespoke.from(parent, [
        search()
      ]);
      deck.slide(0);
    });

    afterEach(resetDom);

    it('should open a search box when the default key is pressed', function(done) {
      pressKeyCombination('ctrl', 'f');

      var searchEl = document.getElementById('bespoke-search');

      setTimeout(function() {
        expect(searchEl).not.toBeUndefined();
        expect(searchEl.classList.contains('bespoke-search-searching')).toBeTruthy();

        done();
      }, 500);
    });

    it('should close the search box when "ESC" is pressed', function() {
      var searchEl = document.getElementById('bespoke-search');
      searchEl.style.display = "block";

      pressKeyCode(27);
      expect(searchEl.classList.contains('bespoke-search-searching')).toBeFalsy();
    });
  });

  describe('searching', function() {

    beforeEach(function() {
      var parent = createSingleResultDom();
      deck = bespoke.from(parent, [
        search()
      ]);
      deck.slide(0);
    });

    afterEach(resetDom);

    it('should find all occurrencies of the searched pattern', function() {
      pressKeyCombination('ctrl', 'f');
      var searchInputEl = document.getElementById('bespoke-search-input');
      searchInputEl.value = 'Breakfast';
      pressKeyCode(13);   // enter

      expect(deck.parent.getElementsByClassName('bespoke-search-result').length).toBe(2);
    });

    it('should not find anything when the searched pattern is absent', function() {
      pressKeyCombination('ctrl', 'f');
      var searchInputEl = document.getElementById('bespoke-search-input');
      searchInputEl.value = 'ajdkfjaksdfjalkdfjakd';
      pressKeyCode(13);   // enter

      expect(deck.parent.getElementsByClassName('bespoke-search-result').length).toBe(0);
    });

    it('should style the search box differently if it yielded no results', function() {
      pressKeyCombination('ctrl', 'f');
      var searchEl = document.getElementById('bespoke-search');
      var searchInputEl = document.getElementById('bespoke-search-input');
      searchInputEl.value = 'aaaaaaaaaaaaa cant find this';
      pressKeyCode(13);   // enter

      expect(searchEl.classList).toContain('bespoke-search-no-result');
    });
  });

  describe('search results', function() {

    beforeEach(function() {
      var parent = createMultipleResultsDom();
      deck = bespoke.from(parent, [
        search()
      ]);
      deck.slide(0);
    });

    afterEach(resetDom);

    it('should show the slide with the first occurrence in the results', function() {
      pressKeyCombination('ctrl', 'f');
      var searchInputEl = document.getElementById('bespoke-search-input');
      searchInputEl.value = 'Breakfast';
      pressKeyCode(13);   // enter

      expect(deck.slide()).toBe(1);
    });

    it('should highlight all results', function() {
      pressKeyCombination('ctrl', 'f');
      var searchInputEl = document.getElementById('bespoke-search-input');
      searchInputEl.value = 'Breakfast';
      pressKeyCode(13);   // enter

      expect(deck.parent.getElementsByClassName('bespoke-search-result').length).toBe(4);
    });

    it('should allow navigating (find next) on results, back and forth', function() {
      pressKeyCombination('ctrl', 'f');
      var searchInputEl = document.getElementById('bespoke-search-input');
      searchInputEl.value = 'Hobbit';
      pressKeyCode(13);   // enter
      pressKeyCode(114);  // F3

      expect(deck.slide()).toBe(2);
    });
  });

  xdescribe('keybindings', function() {
    [
      {
        show: 's',
        trigger: 'enter',
        dismiss: 'esc',
        next: 'n',
        before: 'p'
      },
      {
        show: ['ctrl-f', 'f3'],
        trigger: ['enter', 'spacebar'],
        dismiss: 'm',
        next: 'f3',
        before: 'shift-f3'
      }
    ].forEach(function(options) {

      var parseKeys = function(keys) {
        keys = Array.isArray(keys) ? keys : [keys];
        return keys.map(function(shortcut) {
          var special = (/(shift|ctrl|alt)\-/.exec(shortcut) || []),
            which = special.pop() || shortcut;
            special.shift();

          return {
            which: which,
            special: special.join(' ')
          };
        });
      };

      beforeEach(function() {
        var parent = createMultipleResultsDom();
        deck = bespoke.from(parent, [
          search(options)
        ]);
      });
      afterEach(resetDom);

      it('should allow defining keys for SHOWING the search box', function() {
        parseKeys(options.show).forEach(function(key) {
          pressKeyCombination(key.special, key.which);

          var searchEl = document.getElementById('bespoke-search');
          expect(searchEl).not.toBeUndefined();
          expect((searchEl || { style: {} }).classList.contains('bespoke-search-searching')).toBeTruthy();
        });
      });

      it('should allow defining keys for DISMISSING the search box', function() {
        parseKeys(options.dismiss).forEach(function(key) {
          pressKeyCombination(key.special, key.which);

          var searchEl = document.getElementById('bespoke-search');
          expect(searchEl).not.toBeUndefined();
          expect((searchEl || { style: {} }).classList.contains('bespoke-search-searching')).toBeFalsy();
        });
      });

      it('should allow defining keys for TRIGGERING search', function() {
        parseKeys(options.trigger).forEach(function(key) {
          pressKeyCombination(key.special, key.which);

          var searchEl = document.getElementById('bespoke-search');
          expect(searchEl).not.toBeUndefined();
          expect((searchEl || { style: {} }).classList.contains('bespoke-search-searching')).toBeTruthy();
        });
      });
    });
  });
});
