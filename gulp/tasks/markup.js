'use strict';

module.exports = () => (
  $.gulp.task('markup', () => (
    $.gulp
      .src($.path.markup)
      .pipe($.gulp.dest($.path.output.root))
      .pipe($.server.stream())
  ))
);
