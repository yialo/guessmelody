'use strict';

const getReloadTask = require('./reload.js');
getReloadTask();

module.exports = () => {
  $.gulp.task(
      'watch-html',
      $.gulp.series('html', 'reload')
  );
  $.gulp.task(
      'watch-scripts',
      $.gulp.series('scripts', 'reload')
  );
  $.gulp.task(
      'watch-binary',
      $.gulp.series('binary', 'reload')
  );
};
