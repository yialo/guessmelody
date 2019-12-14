module.exports = () => {
  $.gulp.task(
    'renew:files',
    $.gulp.series('files', 'reload')
  );
  $.gulp.task(
    'renew:fonts',
    $.gulp.series('fonts', 'reload')
  );
  $.gulp.task(
    'renew:bitmaps',
    $.gulp.series('images:bitmap', 'reload')
  );
  $.gulp.task(
    'renew:vector',
    $.gulp.series('images:vector', 'reload')
  );
};
