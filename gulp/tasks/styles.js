'use strict';

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = () => {
  $.gulp.task('styles', () => (
    $.gulp
      .src($.path.styles.main)
      .pipe($.pl.plumber())
      .pipe($.pl.if(
        !isProduction,
        $.pl.sourcemaps.init()
      ))
      .pipe($.pl.postcss())
      .pipe($.pl.if(
        !isProduction,
        $.pl.sourcemaps.write('.')
      ))
      .pipe($.gulp.dest(`${$.path.dist}/css`))
      .pipe($.server.stream())
  ));
};
