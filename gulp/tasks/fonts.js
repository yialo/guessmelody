'use strict';

module.exports = () => (
  $.gulp.task('fonts', () => (
    $.gulp
      .src($.path.fonts, {base: `./source`}, {since: $.gulp.lastRun('fonts')})
      .pipe($.gulp.dest($.path.output.root))
  ))
);
