module.exports = () => {
  $.gulp.task('copy-html', () => $.gulp
    .src(`*.{html,ico}`)
    .pipe($.gulp.dest(`build`))
    .pipe($.server.stream())
  );
  $.gulp.task('copy-binary', () => $.gulp
    .src(
        [`fonts/*.{woff,woff2}`, `img/*.*`],
        {base: `.`}
    )
      .pipe($.gulp.dest(`build`))
  );
  $.gulp.task('copy', $.gulp.parallel(
      'copy-html',
      'copy-binary'
  ));
};
