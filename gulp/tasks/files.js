'use strict';

module.exports = () => (
  $.gulp.task('files', () => (
    $.gulp
      .src($.path.files, { base: `./source` }, { since: $.gulp.lastRun('files') })
      .pipe($.gulp.dest($.path.output.root))
  ))
);
