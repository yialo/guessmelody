'use strict';

module.exports = () => (
  $.gulp.task(
    'default',
    $.gulp.series('build', 'serve')
  )
);
