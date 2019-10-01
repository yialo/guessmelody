'use strict';

const rollupOptions = [
  {
    plugins: [
      $.rp.babel({ runtimeHelpers: true }),
      $.rp.commonjs(),
      $.rp.resolve({ browser: true }),
      process.env.NODE_ENV === 'production' ? $.rp.terser() : false,
    ],
  },
  {
    file: `${$.path.scripts.outputName}.js`,
    format: 'iife',
  },
];

module.exports = () => (
  $.gulp.task('scripts', () => (
    $.gulp
      .src($.path.scripts.main)
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.betterRollup(...rollupOptions))
      .pipe($.pl.sourcemaps.write(`./`))
      .pipe($.gulp.dest(`${$.path.root}/js`))
      .pipe($.server.stream())
  ))
);
