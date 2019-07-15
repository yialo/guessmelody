'use strict';

const paths = `./gulp/paths/`;

global['$'] = {
  autoprefixer: require('autoprefixer'),
  del: require('del'),
  gulp: require('gulp'),
  path: {
    output: require(`${paths}output.js`),
    source: require(`${paths}source.js`),
    tasks: require(`${paths}tasks.js`),
  },
  pl: require('gulp-load-plugins')(),
  server: require('browser-sync').create(),
};

$.path.tasks.forEach((taskPath) => require(taskPath)());
$.gulp.task(
    'build',
    $.gulp.series(
        'clean',
        $.gulp.parallel(
            'binary',
            'html',
            'scripts',
            'style'
        )
    )
);
$.gulp.task('default', $.gulp.series('build', 'serve'));
