'use strict';

const paths = `./gulp/paths/`;

global.$ = {
  autoprefixer: require('autoprefixer'),
  del: require('del'),
  gulp: require('gulp'),
  path: {
    'fonts': require(`${paths}fonts.js`),
    'markup': require(`${paths}markup.js`),
    'images': require(`${paths}images.js`),
    'output': require(`${paths}output.js`),
    'scripts': require(`${paths}scripts.js`),
    'styles': require(`${paths}styles.js`),
    'tasks': require(`${paths}tasks.js`),
  },
  pl: require('gulp-load-plugins')(),
  rp: {
    commonjs: require('rollup-plugin-commonjs'),
  },
  sassImporter: require('node-sass-magic-importer'),
  server: require('browser-sync').create(),
};

$.path.tasks.forEach((taskPath) => require(`./gulp/tasks/${taskPath}`)());

$.gulp.task(
    'build',
    $.gulp.series(
        'clean',
        $.gulp.parallel(
            'fonts',
            'images-bitmap',
            'images-vector',
            'markup',
            'scripts',
            'styles'
        )
    )
);
$.gulp.task('default', $.gulp.series('build', 'serve'));
