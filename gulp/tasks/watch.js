'use strict';

module.exports = () => {
  $.gulp.task(
    'watch-files',
    $.gulp.series('files', 'reload')
  );
  $.gulp.task(
    'watch-fonts',
    $.gulp.series('fonts', 'reload')
  );
  $.gulp.task(
    'watch-bitmaps',
    $.gulp.series('images-bitmap', 'reload')
  );
  $.gulp.task(
    'watch-vector',
    $.gulp.series('images-vector', 'reload')
  );
};
