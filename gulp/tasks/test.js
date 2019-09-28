'use strict';

module.exports = () => (
  $.gulp.task('test', () => (
    $.gulp
      .src($.path.test)
      .pipe($.pl.betterRollup(
        { plugins: [$.rp.commonjs()] },
        { format: 'cjs' }
      ))
      .pipe($.gulp.dest(`${$.path.root}/test`))
      .pipe($.pl.mocha({ ui: 'bdd' }))
  ))
);
