'use strict';

module.exports = () =>
  $.gulp.task('html', () =>
    $.gulp
      .src($.path.source.html)
      .pipe($.gulp.dest($.path.output.root))
      .pipe($.server.stream())
  );
