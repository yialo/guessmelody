'use strict';

global.$ = {
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
  pc: {
    autoprefixer: require('autoprefixer'),
    import: require('postcss-import'),
    env: require('postcss-preset-env'),
    mixins: require('postcss-mixins'),
    nano: require('cssnano'),
  },
  pl: require('gulp-load-plugins')(),
  rp: {
    commonjs: require('rollup-plugin-commonjs'),
  },
  server: require('browser-sync').create(),
  tasks: require('./gulp/common/tasks.js'),
};

$.tasks.forEach((name) => require(`./gulp/tasks/${name}.js`)());
