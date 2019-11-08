'use strict';

module.exports = () => {
  $.gulp.task('markup', () => (
    $.gulp
      .src($.path.markup)
      .pipe($.gulp.dest($.path.dist))
      .pipe($.server.stream())
  ));
};
