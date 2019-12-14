module.exports = () => {
  $.gulp.task(
    'build',
    $.gulp.series(
      'clean',
      $.gulp.parallel(
        'files',
        'fonts',
        'images:bitmap',
        'images:vector',
        'markup',
        'scripts',
        'styles'
      )
    )
  );
};
