module.exports = () => $.gulp.task('serve', () => {
  $.server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false,
  });

  $.gulp.watch(`*.html`, $.gulp.series('copy-html'));
  $.gulp.watch(`sass/**/*.{scss,sass}`, $.gulp.series('style'));
  $.gulp.watch(`js/**/*.js`, $.gulp.series('js-watch'));
});
