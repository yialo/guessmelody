'use strict';

module.exports = () => (
  $.gulp.task('styles', () => (
    $.gulp
      .src($.path.styles.main)
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.postcss())
      .pipe($.pl.sourcemaps.write(`./`))
      .pipe($.gulp.dest(`${$.path.output.root}/css`))
      .pipe($.server.stream())
  ))
);
