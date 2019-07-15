'use strict';

global.$ = {
  autoprefixer: require('autoprefixer'),
  del: require('del'),
  gulp: require('gulp'),
  imagemin: require('gulp-imagemin'),
  minify: require('gulp-csso'),
  plumber: require('gulp-plumber'),
  postcss: require('gulp-postcss'),
  rename: require('gulp-rename'),
  rollup: require('gulp-better-rollup'),
  sass: require('gulp-sass'),
  server: require('browser-sync').create(),
  sourcemaps: require('gulp-sourcemaps'),
  paths: require('./gulp/paths.js'),
};

$.paths.forEach((taskPath) => require(taskPath)());
$.gulp.task('build', $.gulp.series('clean', $.gulp.parallel('copy', 'scripts', 'style')));
$.gulp.task('default', $.gulp.series('build', 'serve'));
