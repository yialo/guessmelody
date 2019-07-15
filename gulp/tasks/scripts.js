'use strict';

module.exports = () =>
  $.gulp.task('scripts', () =>
    $.gulp
      .src(`js/**/*.js`)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.rollup({}, {format: 'iife'}))
      .pipe($.sourcemaps.write(``))
      .pipe($.gulp.dest(`build/js/`))
      .pipe($.server.stream())
  );
