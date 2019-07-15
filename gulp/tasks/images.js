'use strict';

module.exports = () =>
  $.gulp.task('images', () =>
    $.gulp
      .src($.path.source.images, {base: `.`}, {since: $.gulp.lastRun('images')})
      .pipe($.gulp.dest($.path.output.root))
  );
