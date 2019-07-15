'use strict';

module.exports = () =>
  $.gulp.task('style', () =>
    $.gulp
      .src(`sass/style.scss`)
      .pipe($.plumber())
      .pipe($.sass())
      .pipe($.postcss([$.autoprefixer()]))
      .pipe($.gulp.dest(`build/css`))
      .pipe($.server.stream())
      .pipe($.minify())
      .pipe($.rename(`style.min.css`))
      .pipe($.gulp.dest(`build/css`))
  );
