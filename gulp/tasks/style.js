module.exports = () => $.gulp.task('style', () => {
  return $.gulp.src(`sass/style.scss`)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.postcss([
      $.autoprefixer(),
      $.mqpacker({sort: true}),
    ]))
    .pipe($.gulp.dest(`build/css`))
    .pipe($.server.stream())
    .pipe($.minify())
    .pipe($.rename(`style.min.css`))
    .pipe($.gulp.dest(`build/css`));
});
