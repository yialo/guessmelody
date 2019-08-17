'use strict';

module.exports = () => (
  $.gulp.task(
    'build',
    $.gulp.series(
      'clean',
      $.gulp.parallel(
        'fonts',
        'images-bitmap',
        'images-vector',
        'markup',
        'scripts',
        'styles'
      )
    )
  )
);
