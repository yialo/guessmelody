'use strict';

module.exports = () =>
  $.gulp.task('imagemin', () =>
    $.gulp
      .src(`resources/raw/**/*.{gif,jpeg,jpg,png,svg}`)
      .pipe(
          $.imagemin([
            $.imagemin.optipng({optimizationLevel: 3}),
            $.imagemin.jpegtran({progressive: true}),
          ])
      )
      .pipe($.gulp.dest(`img`))
  );
