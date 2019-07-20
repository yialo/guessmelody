'use strict';

module.exports = () =>
  $.gulp.task('test', () =>
    $.gulp
      .src([`./source/js/**/*.test.js`])
      .pipe($.pl.betterRollup(
          {plugins: [$.rollupPl.commonjs()]},
          {format: 'cjs'}
      ))
      .pipe($.gulp.dest(`${$.path.output.root}/test`))
      .pipe($.pl.mocha())
  );
