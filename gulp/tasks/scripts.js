'use strict';

module.exports = () => (
  $.gulp.task('scripts', () => (
    $.gulp
      .src($.path.scripts.main)
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.betterRollup(
        {},
        {
          file: `${$.path.scripts.outputName}.js`,
          format: 'iife',
        }
      ))
      .pipe($.pl.sourcemaps.write(``))
      .pipe($.gulp.dest(`${$.path.output.root}/js`))
      .pipe($.server.stream())
  ))
);
