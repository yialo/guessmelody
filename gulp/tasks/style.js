'use strict';

module.exports = () =>
  $.gulp.task('style', () =>
    $.gulp
      .src($.path.source['style-main'])
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.sass())
      .pipe($.pl.postcss([$.autoprefixer()]))
      .pipe($.pl.csso())
      .pipe($.pl.rename(`style.min.css`))
      .pipe($.pl.sourcemaps.write(``))
      .pipe($.gulp.dest(`${$.path.output.root}/css`))
      .pipe($.server.stream())
  );
