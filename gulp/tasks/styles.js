'use strict';

const postcssPlugins = [
  $.pc.import(
    $.pc.normalize().postcssImport()
  ),
  $.pc.mixins(),
  $.pc.env({
    stage: 3,
    features: {
      'custom-selectors': true,
      'nesting-rules': true,
    },
  }),
  $.pc.autoprefixer(),
];

module.exports = () => (
  $.gulp.task('styles', () => (
    $.gulp
      .src($.path.styles.main)
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.postcss(postcssPlugins))
      .pipe($.pl.csso())
      .pipe($.pl.sourcemaps.write(`.`))
      .pipe($.gulp.dest(`${$.path.output.root}/css`))
      .pipe($.server.stream())
  ))
);
