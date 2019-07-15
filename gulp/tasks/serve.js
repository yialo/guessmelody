'use strict';

const getWatchTask = require('./watch.js');
getWatchTask();

const {watch} = $.gulp;
const {fonts, images, html, 'scripts-all': scripts, 'style-all': style} = $.path.source;

module.exports = () =>
  $.gulp.task('serve', () => {
    $.server.init({
      server: $.path.output.root,
      notify: false,
      open: true,
      port: 3502,
      ui: false,
    });

    watch(html, $.gulp.series('html'));
    watch(style, $.gulp.series('style'));
    watch(scripts, $.gulp.series('scripts'));
    watch(fonts, $.gulp.series('watch-fonts'));
    watch(images, $.gulp.series('watch-images'));
  });
