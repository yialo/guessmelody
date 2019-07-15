'use strict';

module.exports = () =>
  $.gulp.task('binary', () =>
    $.gulp
      .src($.path.source.binary, {base: `.`})
      .pipe($.gulp.dest($.path.output.root))
  );
