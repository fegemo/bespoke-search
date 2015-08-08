module.exports = function({
    showKey = 'ctrl-f',
    dismissKey = 'escape',
    triggerKey = 'enter',
    nextKey = ['f3', 'tab'],
    prevKey = ['shift-f3', 'shift-tab']
  } = {}) {

  var makeArray = (obj) => Array.isArray(obj) ? obj : [obj];
    showKey = makeArray(showKey);
    dismissKey = makeArray(dismissKey);
    triggerKey = makeArray(triggerKey);
    nextKey = makeArray(nextKey);
    prevKey = makeArray(prevKey);

  return function(deck) {
    var keymage = require('keymage'),
      searchEl,
      searchInputEl,
      searchResultsCountEl,
      currentResultIndex,
      results = [],
      cachedSlidesText = deck.slides.map((slide, i) => { return {i: i, text: slide.textContent} });

    let clearResults = function() {
        var parentsOfResults = new Set();

        results.forEach(r => {
          var originalContent = document.createTextNode(r.el.innerText);
          parentsOfResults.add(r.el.parentNode);
          r.el.parentNode.replaceChild(originalContent, r.el);
        });
        parentsOfResults.forEach(p => p.normalize());

        results.length = 0;
      },

      show = function(e) {
        e.preventDefault();
        searchEl.classList.add('bespoke-search-searching');
        searchEl.classList.remove('bespoke-search-no-result');
        searchInputEl.focus();
        keymage.pushScope('searching');
        deck.parent.classList.add('bespoke-bullet-off');
      },

      hide = function(e) {
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

      reportResultStats = function() {
        searchResultsCountEl.innerText = results.length > 0 ?
          `${currentResultIndex+1}/${results.length}` : '';
        searchEl.classList.toggle('bespoke-search-no-result', results.length === 0);
      },

      focusAtResult = function(index) {
        var result = results[index] || {},
          prevResult = results[currentResultIndex] || {},
          slideIndexOfResult = (result).slideIndex;
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

      navigateResult = function(direction) {
        var newIndex = (currentResultIndex + direction + results.length) % results.length;
        focusAtResult(newIndex);
      },

      search = function() {
        var searchPattern = searchInputEl.value.trim();
        if (searchPattern === '') {
          return;
        }

        var searchRegex = new RegExp(searchPattern, 'i'),
          matchedSlides = cachedSlidesText.filter(slide => searchRegex.test(slide.text));


        let searchElement = function searchElement(el, visitFunction) {
          var results = [];

          switch (el.nodeType) {
            case Node.TEXT_NODE:
              if (searchRegex.test(el.data)) {
                results = visitFunction(el);
              }
              break;
            case Node.ELEMENT_NODE:
              for (let child of Array.from(el.childNodes)) {
                results.push(...searchElement(child, visitFunction));
              }
              break;
          }

          return results;
        };

        let markResult = function(textNode) {
          var parent = textNode.parentNode,
            frag = (function(){
              var wrap = document.createElement('div'),
                frag = document.createDocumentFragment();
              wrap.innerHTML = textNode.data.replace(new RegExp(`(${searchPattern})`, 'gi'), '<span class="bespoke-search-result">$1</span>');
              while (wrap.firstChild) {
                frag.appendChild(wrap.firstChild);
              }
              return frag;
            })();

          let inserted = frag.querySelectorAll('.bespoke-search-result');
          parent.insertBefore(frag, textNode);
          parent.removeChild(textNode);

          // returns an array with the newly created elements
          return Array.from(inserted);
        };

        // find occurrences
        results = matchedSlides.reduce((previous, curr) => {
          var slideEl = deck.slides[curr.i],
            occurrences = searchElement(slideEl, markResult).map(result => ({ slideIndex: curr.i, el: result }));

          return previous.concat(occurrences);
        }, []);

        // report the number of occurrences
        searchResultsCountEl.innerText = `1/${results.length}`;

        // moves to the slide of the first occurrence
        focusAtResult(0);
      },

      createSearchBox = function() {
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


    showKey.forEach((key) => keymage(key, show));
    dismissKey.forEach((key) => keymage('searching', key, hide));
    triggerKey.forEach((key) => keymage('searching', key, () => { clearResults(); search(); return false; }));
    nextKey.forEach((key) => keymage('searching', key, navigateResult.bind(key, +1), {preventDefault: true}));
    prevKey.forEach((key) => keymage('searching', key, navigateResult.bind(key, -1), {preventDefault: true}));

    deck.parent.parentNode.addEventListener('keydown', function(e) {
      if (e.target.id === 'bespoke-search-input') {
        if (e.which >= 32) {
          e.stopPropagation();
        }
      }
    });
    createSearchBox();
  };
};
