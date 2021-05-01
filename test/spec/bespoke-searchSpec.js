/* eslint-env jasmine */
const bespoke = require('bespoke')
const search = require('../../dist/bespoke-search.js')

let deck = null

const keyCodes = {
  'Esc': 27,
  'Enter': 13,
  'Tab': 9
} 

function pressKey(key) {
  const options = { 
    key,
    keyCode: key.length > 1 ? keyCodes[key] : key.toUpperCase().charCodeAt(0)
  }
  const event = new KeyboardEvent('keydown', options)
  window.dispatchEvent(event)
}

function pressKeyCombination(special, key) {
  if (typeof key === 'undefined') key = special
  switch (key) {
  case 'space':
    key = ' '; break
  }
  let options = {
    key,
    keyCode: key.length > 1 ? keyCodes[key] : key.toUpperCase().charCodeAt(0)
  }
  if (typeof special === 'string') {
    ['ctrl', 'alt', 'shift'].forEach(function(sp) {
      if (special.indexOf(sp) !== -1) {
        options[sp + 'Key'] = true
      }
    })
  }

  window.dispatchEvent(new KeyboardEvent('keydown', options))
}

function resetDom() {
  while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild)
  }
}

function createEmptyDom() {
  let parent = document.createElement('article')
  parent.appendChild(document.createElement('section'))
  parent.appendChild(document.createElement('section'))
  document.body.appendChild(parent)

  return parent
}

function createSingleResultDom() {
  let parent = document.createElement('article')
  let section = document.createElement('section')

  section.innerHTML = `
    <h1>Hobbit Meals</h1>
    <ul>
      <li><span>7:00am – Breakfast</span></li>
      <li><span>9:00am – Second Breakfast</span></li>
      <li><span>11:00am – Elevenses</span></li>
      <li><span>1:00pm – Luncheon</span></li>
      <li><span>4:00pm – Afternoon Tea</span></li>
      <li><span>6:00pm – Dinner</span></li>
      <li><span>8:00pm – Supper&nbsp;</span></li>
    </ul>
    <p>In portuguese: refeições anãs anarquicas</p>`
  parent.appendChild(document.createElement('section'))
  parent.appendChild(section)
  document.body.appendChild(parent)

  return parent
}

function createMultipleResultsDom() {
  let parent = createSingleResultDom()
  let cloned = parent.lastChild.cloneNode(true)
  parent.appendChild(cloned)

  return parent
}

describe('bespoke-search', function() {

  describe('search box', function() {

    beforeEach(function() {
      let parent = createEmptyDom()
      deck = bespoke.from(parent, [
        search()
      ])
      deck.slide(0)
    })

    afterEach(resetDom)

    it('should open a search box when the default key is pressed', function() {
      pressKeyCombination('ctrl', 'f')

      let searchParentEl = document.getElementById('bespoke-search-parent')

      expect(searchParentEl).not.toBeUndefined()
      expect(searchParentEl.classList.contains('bespoke-search-searching')).toBeTrue()
    })

    it('should close the search box when "ESC" is pressed', function() {
      pressKeyCombination('ctrl', 'f')
      pressKey('Esc')
      let searchParentEl = document.getElementById('bespoke-search-parent')
      expect(searchParentEl.classList.contains('bespoke-search-searching')).toBeFalse()
    })
  })

  describe('searching', function() {

    beforeEach(function() {
      let parent = createSingleResultDom()
      deck = bespoke.from(parent, [
        search()
      ])
      deck.slide(0)
    })

    afterEach(resetDom)

    it('should find all occurrencies of the searched pattern', function() {
      pressKeyCombination('ctrl', 'f')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'Breakfast'
      pressKey('Enter')

      expect(deck.parent.getElementsByClassName('bespoke-search-result').length).toBe(2)
    })

    it('should not find anything when the searched pattern is absent', function() {
      pressKeyCombination('ctrl', 'f')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'ajdkfjaksdfjalkdfjakd'
      pressKey('Enter')

      expect(deck.parent.getElementsByClassName('bespoke-search-result').length).toBe(0)
    })

    it('should style the search box differently if it yielded no results', function() {
      pressKeyCombination('ctrl', 'f')
      let searchEl = document.getElementById('bespoke-search')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'aaaaaaaaaaaaa cant find this'
      pressKey('Enter')

      expect(searchEl.classList).toContain('bespoke-search-no-result')
    })

    it('should find results disregarding accentuation', function() {
      pressKeyCombination('ctrl', 'f')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'refeicões anas anárquicas'
      pressKey('Enter')

      expect(
        deck.parent.getElementsByClassName('bespoke-search-result').length
      ).toBe(1)
    })
  })

  describe('search results', function() {

    beforeEach(function() {
      let parent = createMultipleResultsDom()
      deck = bespoke.from(parent, [
        search()
      ])
      deck.slide(0)
    })

    afterEach(resetDom)

    it('should show the slide with the first occurrence in the results', function() {
      pressKeyCombination('ctrl', 'f')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'Breakfast'
      pressKey('Enter')

      expect(deck.slide()).toBe(1)
    })

    it('should highlight all results', function() {
      pressKeyCombination('ctrl', 'f')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'Breakfast'
      pressKey('Enter')

      expect(deck.parent.getElementsByClassName('bespoke-search-result').length).toBe(4)
    })

    it('should allow navigating (find next) on results, back and forth', function() {
      pressKeyCombination('ctrl', 'f')
      let searchInputEl = document.getElementById('bespoke-search-input')
      searchInputEl.value = 'Hobbit'
      expect(deck.slide()).toBe(0)
      pressKey('Enter')

      expect(deck.slide()).toBe(1)
    })
  })

  describe('keybindings', function() {
    const options = {
      keys: {
        show: 's',
        trigger: 'space',
        dismiss: 'm',
        next: 'n',
        previous: 'p'
      }
    }

    let parseKeys = function(keys) {
      keys = Array.isArray(keys) ? keys : [keys]
      return keys.map(function(shortcut) {
        let special = (/(shift|ctrl|alt)-/.exec(shortcut) || []),
          which = special.pop() || shortcut
        special.shift()

        return {
          which: which,
          special: special.join(' ')
        }
      })
    }

    beforeEach(function() {
      let parent = createMultipleResultsDom()
      deck = bespoke.from(parent, [
        search(options)
      ])
    })
    afterEach(resetDom)

    it('should allow defining keys for SHOWING the search box', function() {
      parseKeys(options.keys.show).forEach(function(key) {
        pressKeyCombination(key.special, key.which)

        let searchParentEl = document.getElementById('bespoke-search-parent')
        expect(searchParentEl).not.toBeUndefined()
        expect(searchParentEl.classList.contains('bespoke-search-searching')).toBeTrue()
      })
    })

    it('should allow defining keys for DISMISSING the search box', function() {
      parseKeys(options.keys.dismiss).forEach(function(key) {
        pressKeyCombination(key.special, key.which)

        let searchParentEl = document.getElementById('bespoke-search-parent')
        expect(searchParentEl).not.toBeUndefined()
        expect(searchParentEl.classList.contains('bespoke-search-searching')).toBeFalse()
      })
    })

    it('should allow defining keys for TRIGGERING search', function() {
      parseKeys(options.keys.trigger).forEach(function(key) {
        const openKey = parseKeys(options.keys.show)[0]
        pressKeyCombination(openKey.special, openKey.which)
        let searchInputEl = document.getElementById('bespoke-search-input')
        searchInputEl.value = '11:00'
        pressKeyCombination(key.special, key.which)

        expect(deck.parent.querySelector('bespoke-search-result')).toBeDefined()
      })
    })

    it('should allow defining keys for NAVIGATING NEXT result', function() {
      parseKeys(options.keys.next).forEach(function(key) {
        const openKey = parseKeys(options.keys.show)[0]
        const triggerKey = parseKeys(options.keys.trigger)[0]
        pressKeyCombination(openKey.special, openKey.which)
        let searchInputEl = document.getElementById('bespoke-search-input')
        searchInputEl.value = '11:00'
        pressKeyCombination(triggerKey.special, triggerKey.which)

        pressKeyCombination(key.special, key.which)
        
        const results = deck.parent.querySelectorAll('.bespoke-search-result')
        expect(results[results.length - 1].classList.contains('bespoke-search-result-focused')).toBeTrue()
      })
    })

    it('should allow defining keys for NAVIGATING PREVIOUS result', function() {
      parseKeys(options.keys.previous).forEach(function(key) {
        const openKey = parseKeys(options.keys.show)[0]
        const triggerKey = parseKeys(options.keys.trigger)[0]
        pressKeyCombination(openKey.special, openKey.which)
        let searchInputEl = document.getElementById('bespoke-search-input')
        searchInputEl.value = '11:00'
        pressKeyCombination(triggerKey.special, triggerKey.which)
        
        pressKeyCombination(key.special, key.which)

        const results = deck.parent.querySelectorAll('.bespoke-search-result')
        expect(results[results.length - 1].classList.contains('bespoke-search-result-focused')).toBeTrue()
      })
    })
  })

  describe('styles', function() {
    let parent = null 
    
    beforeEach(() => {
      parent = createEmptyDom()
    })

    afterEach(() => {
      resetDom()
      const addedStyle = document.head.querySelector('style[data-href]')
      if (addedStyle) {
        addedStyle.remove()
      }
    })

    it('should include a stylesheet in the head if the "insertStyles" options is set', function() {
      deck = bespoke.from(parent, [
        search({ insertStyles: true })
      ])
      deck.slide(0)
      expect(document.querySelector('style[data-href]')).toBeDefined()
    })
    
    it('should NOT include a stylesheet in the head if the "insertStyles" options is ABSENT', function() {
      deck = bespoke.from(parent, [
        search({ insertStyles: false })
      ])
      deck.slide(0)
      expect(document.querySelector('style[data-href]')).toBe(null)
    })
  })
})
