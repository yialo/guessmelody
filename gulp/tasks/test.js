'use strict';

const testPaths = [`./source/js/**/*.test.js`];

module.exports = () => (
  $.gulp.task('test', () => (
    $.gulp
      .src(testPaths)
      .pipe($.pl.betterRollup(
          {plugins: [$.rp.commonjs()]},
          {format: 'cjs'}
      ))
      .pipe($.gulp.dest(`${$.path.output.root}/test`))
      .pipe($.pl.mocha({ui: 'bdd'}))
  ))
);
