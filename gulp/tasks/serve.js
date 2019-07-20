'use strict';

(function getWatchTasks() {
  require('./watch.js')();
}());

const {watch} = $.gulp;
const {
  fonts,
  images: {bitmap, vector},
  markup,
  scripts: {all: scripts},
  styles: {all: styles},
} = $.path;

const addWatchers = () => {
  watch(markup, $.gulp.series('markup'));
  watch(styles, $.gulp.series('styles'));
  watch(scripts, $.gulp.series('scripts'));
  watch(fonts, $.gulp.series('watch-fonts'));
  watch(bitmap, $.gulp.series('watch-bitmaps'));
  watch(vector, $.gulp.series('watch-vector'));
};

const serverOptions = {
  server: $.path.output.root,
  notify: false,
  open: true,
  port: 3502,
  ui: false,
};

module.exports = () =>
  $.gulp.task('serve', () => {
    $.server.init(serverOptions);
    addWatchers();
  });
