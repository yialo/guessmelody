'use strict';

module.exports = () =>
  $.gulp.task('binary', () =>
    $.gulp
      .src($.path.source.binary, {base: `.`}, {since: $.gulp.lastRun('binary')})
      .pipe($.gulp.dest($.path.output.root))
  );
