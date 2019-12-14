const isProduction = (process.env.NODE_ENV === 'production');

const rollupOptions = [
  {
    plugins: [
      $.rp.babel({ runtimeHelpers: true }),
      $.rp.commonjs(),
      $.rp.resolve({ browser: true }),
      isProduction ? $.rp.terser() : false,
    ],
  },
  {
    file: `${$.path.scripts.outputName}.js`,
    format: 'iife',
  },
];

module.exports = () => {
  $.gulp.task('scripts', () => (
    $.gulp
      .src($.path.scripts.main)
      .pipe($.pl.plumber())
      .pipe($.pl.if(
        !isProduction,
        $.pl.sourcemaps.init()
      ))
      .pipe($.pl.betterRollup(...rollupOptions))
      .pipe($.pl.if(
        !isProduction,
        $.pl.sourcemaps.write('.')
      ))
      .pipe($.gulp.dest(`${$.path.dist}/js`))
      .pipe($.server.stream())
  ));
};
