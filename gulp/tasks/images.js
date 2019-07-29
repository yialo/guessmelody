'use strict';

module.exports = () => {
  $.gulp.task('images-bitmap', () => (
    $.gulp
      .src($.path.images.bitmap, {base: `./source`}, {since: $.gulp.lastRun('images-bitmap')})
      .pipe($.gulp.dest($.path.output.root))
  ));
  $.gulp.task('images-vector', () => (
    $.gulp
      .src($.path.images.vector, {base: `./source`}, {since: $.gulp.lastRun('images-vector')})
      .pipe($.gulp.dest($.path.output.root))
  ));
};
