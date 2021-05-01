const keymage = require('keymage')
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
      require('../lib/bespoke-search.css')
    }
  }
}
