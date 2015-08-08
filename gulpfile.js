var gulp = require('gulp'),
  del = require('del'),
  jshint = require('gulp-jshint'),
  karma = require('karma'),
  coveralls = require('gulp-coveralls'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  gzip = require('gulp-gzip'),
  micro = require('gulp-micro'),
  pkg = require('./package.json'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

gulp.task('default', ['clean', 'lint', 'test', 'compile']);
gulp.task('dev', ['compile', 'lint', 'test', 'watch']);

gulp.task('watch', function() {
  gulp.watch(['lib/**/*.js', 'lib/**/*.js.es6'], ['lint', 'compile']);
  gulp.watch('test/spec/**/*.js', ['test']);
});

gulp.task('clean', function(done) {
  del([
    'dist',
    'lib-instrumented',
    'test/coverage'
  ], done);
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'lib/**/*.js', 'specs/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['compile'], function(done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
  server.start();
});

gulp.task('coveralls', ['test'], function() {
  return gulp.src(['test/coverage/lcov/**/lcov.info'])
    .pipe(coveralls());
});

gulp.task('compile', ['clean'], function() {
  return browserify({
      entries: ['./lib/bespoke-search'],
      extensions: ['.js', '.json', '.js.es6'],
      debug: true,
      standalone: 'bespoke.plugins.search'
    })
    .transform('babelify')
    .bundle()
    .pipe(source('bespoke-search.js'))
    .pipe(buffer())
    .pipe(header([
      '/*!',
      ' * <%= name %> v<%= version %>',
      ' *',
      ' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
      ' * This content is released under the <%= license %> license',
      ' */\n\n'
    ].join('\n'), pkg))
    .pipe(gulp.dest('dist'))
    .pipe(rename('bespoke-search.min.js'))
    .pipe(uglify())
    .pipe(header([
      '/*! <%= name %> v<%= version %> ',
      '© <%= new Date().getFullYear() %> <%= author.name %>, ',
      '<%= license %> License */\n'
    ].join(''), pkg))
    .pipe(gulp.dest('dist'))
    .pipe(gzip())
    .pipe(micro({limit: 4000}));
});
