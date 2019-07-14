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
  paths: require('./gulp/paths/tasks.js'),
};

require('./gulp/tasks/clean');
require('./gulp/tasks/copy');
require('./gulp/tasks/imagemin');
require('./gulp/tasks/js-watch');
require('./gulp/tasks/scripts');
require('./gulp/tasks/serve');
require('./gulp/tasks/style');

// $.paths.forEach((taskPath) => require(taskPath));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel('copy', 'scripts', 'style')
));

$.gulp.task('test', () => {});

$.gulp.task('default', $.gulp.series('build', 'serve'));
