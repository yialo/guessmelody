'use strict';

const getReloadTask = require('./reload.js');
getReloadTask();

module.exports = () => {
  $.gulp.task(
      'watch-fonts',
      $.gulp.series('fonts', 'reload')
  );
  $.gulp.task(
      'watch-images',
      $.gulp.series('images', 'reload')
  );
};
