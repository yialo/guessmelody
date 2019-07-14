'use strict';

global.$ = {
  autoprefixer: require('autoprefixer'),
  del: require('del'),
  gulp: require('gulp'),
  imagemin: require('gulp-imagemin'),
  minify: require('gulp-csso'),
  mqpacker: require('css-mqpacker'),
  plumber: require('gulp-plumber'),
  postcss: require('gulp-postcss'),
  rename: require('gulp-rename'),
  rollup: require('gulp-better-rollup'),
  sass: require('gulp-sass'),
  server: require('browser-sync').create(),
  sourcemaps: require('gulp-sourcemaps'),

  paths: require('./gulp/paths/tasks'),
};

$.paths.forEach((taskPath) => require(taskPath));

$.gulp.task('scripts', () => $.gulp
  .src(`js/**/*.js`)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.rollup({}, {format: 'iife'}))
  .pipe($.sourcemaps.write(``))
  .pipe($.gulp.dest(`build/js/`))
  .pipe($.server.stream())
);

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
    'scripts',
    'style',
    'copy-binary'
));

$.gulp.task('clean', () => $.del(`build`));

$.gulp.task('js-watch', $.gulp.series(
    'scripts',
    (done) => {
      $.server.reload();
      done();
    }
));

$.gulp.task('build', $.gulp.series('clean', 'copy'));

$.gulp.task('serve', () => {
  $.server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  $.gulp.watch(`*.html`, $.gulp.series('copy-html'));
  $.gulp.watch(`sass/**/*.{scss,sass}`, $.gulp.series('style'));
  $.gulp.watch(`js/**/*.js`, $.gulp.series('js-watch'));
});

$.gulp.task('test', () => {});

$.gulp.task('default', $.gulp.series('build', 'serve'));
