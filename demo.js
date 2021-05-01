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
