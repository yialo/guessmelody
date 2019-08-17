'use strict';

global.$ = {
  autoprefixer: require('autoprefixer'),
  del: require('del'),
  gulp: require('gulp'),
  path: require('./gulp/common/path.js'),
  pl: require('gulp-load-plugins')(),
  rp: {
    commonjs: require('rollup-plugin-commonjs'),
  },
  sassImporter: require('node-sass-magic-importer'),
  server: require('browser-sync').create(),
  tasks: require('./gulp/common/tasks.js'),
};

$.tasks.forEach((name) => require(`./gulp/tasks/${name}.js`)());
