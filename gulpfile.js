'use strict';

global.$ = {
  autoprefixer: require('autoprefixer'),
  del: require('del'),
  gulp: require('gulp'),
  imp: {
    gifsicle: require('imagemin-gifsicle'),
    jpegtran: require('imagemin-jpegtran'),
    mozjpeg: require('imagemin-mozjpeg'),
    pngquant: require('imagemin-pngquant'),
    zopfli: require('imagemin-zopfli'),
    svgo: require('imagemin-svgo'),
  },
  path: require('./gulp/common/path.js'),
  pl: require('gulp-load-plugins')(),
  rp: {
    commonjs: require('rollup-plugin-commonjs'),
  },
  sassCompiler: require('node-sass'),
  sassImporter: require('node-sass-magic-importer'),
  server: require('browser-sync').create(),
  tasks: require('./gulp/common/tasks.js'),
};

$.tasks.forEach((name) => require(`./gulp/tasks/${name}.js`)());
