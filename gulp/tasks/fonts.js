'use strict';

module.exports = () =>
  $.gulp.task('fonts', () =>
    $.gulp
      .src($.path.source.fonts, {base: `.`}, {since: $.gulp.lastRun('fonts')})
      .pipe($.gulp.dest($.path.output.root))
  );
