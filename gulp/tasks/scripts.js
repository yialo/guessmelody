'use strict';

module.exports = () =>
  $.gulp.task('scripts', () =>
    $.gulp
      .src($.path.source.scripts)
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.betterRollup({}, {format: 'iife'}))
      .pipe($.pl.sourcemaps.write(``))
      .pipe($.gulp.dest(`${$.path.output.root}/js`))
      .pipe($.server.stream())
  );
