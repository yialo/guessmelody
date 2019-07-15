'use strict';

module.exports = () =>
  $.gulp.task(
      'js-watch',
      $.gulp.series('scripts', (done) => {
        $.server.reload();
        done();
      })
  );
