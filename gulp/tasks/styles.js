'use strict';

$.pl.sass.compiler = $.sassCompiler;

const postcssPlugins = [
  $.pc.import(),
  $.pc.mixins(),
  $.pc.env({
    stage: 3,
    features: {
      'nesting-rules': true,
    },
  }),
  $.pc.autoprefixer(),
  $.pc.nano(),
];

module.exports = () => (
  $.gulp.task('styles', () => (
    $.gulp
      .src($.path.styles.main)
      .pipe($.pl.plumber())
      .pipe($.pl.sourcemaps.init())
      .pipe($.pl.postcss(postcssPlugins))
      .pipe($.pl.sourcemaps.write(`.`))
      .pipe($.gulp.dest(`${$.path.output.root}/css`))
      .pipe($.server.stream())
  ))
);
