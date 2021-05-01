const { src, dest, series, parallel, watch } = require('gulp')
const eslint = require('gulp-eslint')
const header = require('gulp-header')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const connect = require('gulp-connect')
const derequire = require('gulp-derequire')
const coveralls = require('@kollavarsham/gulp-coveralls')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const karma = require('karma')
const ghpages = require('gh-pages')
const path = require('path')
const del = require('delete')
const pkg = require('./package.json')

function clean() {
  return del([
    'dist',
    'demo/demo.bundled.js',
    'test/coverage'
  ])
}

function lint() {
  return src(['gulpfile.js', 'lib/**/*.js', 'specs/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

function test(done) {
  const parseConfig = karma.config.parseConfig
  const Server = karma.Server
  parseConfig(path.resolve('karma.conf.js'), null, {
    promiseConfig: true,
    throwErrors: true,
  }).then((karmaConfig) => {
    const server = new Server(karmaConfig, () => {
      done()
    })
    server.start()
  })
}

function coverageReport() {
  return src(['test/coverage/**/lcov.info'])
    .pipe(coveralls())
}

function compileDemo() {
  return browserify({ debug: true })
    .add('demo/demo.js')
    .bundle()
    .pipe(source('demo.bundled.js'))
    .pipe(buffer())
    .pipe(dest('demo'))
    .pipe(connect.reload())
}

function compile() {
  return (
    browserify({
      debug: false,
      standalone: 'bespoke.plugins.search',
    })
      .add('./lib/bespoke-search.js')
      .transform('browserify-css', {
        global: true,
        minify: true,
        autoInject: true,
        autoInjectOptions: {
          verbose: true,
        },
      })
      .bundle()
      .pipe(source('bespoke-search.js'))
      .pipe(buffer())
      .pipe(derequire())
      .pipe(
        header(
          [
            '/*!',
            ' * <%= name %> v<%= version %>',
            ' *',
            ' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
            ' * This content is released under the <%= license %> license',
            ' */\n\n',
          ].join('\n'),
          pkg
        )
      )
      .pipe(dest('dist'))
      .pipe(rename('bespoke-search.min.js'))
      .pipe(
        terser({
          ecma: 2020
        })
      )
      .pipe(dest('dist'))
      .pipe(connect.reload())
  )
}

function dev() {
  const port = 8085

  watch(['demo/**/*', '!demo/demo.bundled.js'], compileDemo)
  watch('lib/**/*.js', series(lint, parallel(compile, compileDemo)))
  watch('lib/**/*.css', series(compile, compileDemo))
  watch('test/spec/**/*.js', test)

  connect.server({
    root: 'demo',
    livereload: true,
    port,
  })
}

function deploy(cb) {
  ghpages.publish(path.join(__dirname, 'demo'), cb)
}

exports.clean = clean
exports.lint = lint
exports.compile = parallel(lint, compile)
exports.test = series(exports.compile, test)
exports.dev = series(compile, compileDemo, dev)
exports.coveralls = series(exports.test, coverageReport)
exports.deploy = deploy
