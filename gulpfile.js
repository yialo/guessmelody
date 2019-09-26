'use strict';

global.$ = {
  del: require('del'),
  gulp: require('gulp'),
  imp: {
    gifsicle: require('imagemin-gifsicle'),
    jpegtran: require('imagemin-jpegtran'),
    mozjpeg: require('imagemin-mozjpeg'),
    pngquant: require('imagemin-pngquant'),
    svgo: require('imagemin-svgo'),
    zopfli: require('imagemin-zopfli'),
  },
  path: require('./gulp/common/path.js'),
  pc: {
    autoprefixer: require('autoprefixer'),
    color: require('postcss-color-function'),
    env: require('postcss-preset-env'),
    import: require('postcss-import'),
    mixins: require('postcss-mixins'),
    normalize: require('postcss-normalize'),
  },
  pl: require('gulp-load-plugins')(),
  rp: {
    commonjs: require('rollup-plugin-commonjs'),
  },
  server: require('browser-sync').create(),
  tasks: require('./gulp/common/tasks.js'),
};

$.tasks.forEach((name) => require(`./gulp/tasks/${name}.js`)());
