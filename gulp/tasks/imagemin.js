'use strict';

module.exports = () =>
  $.gulp.task('imagemin', () =>
    $.gulp
      .src($.path.images.raw)
      .pipe(
          $.pl.imagemin([
            $.pl.imagemin.optipng({optimizationLevel: 3}),
            $.pl.imagemin.jpegtran({progressive: true}),
          ])
      )
      .pipe($.gulp.dest($.path.output.images))
  );
