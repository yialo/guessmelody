module.exports = () => (
  $.gulp.task('clean', () => $.del($.path.dist))
);
