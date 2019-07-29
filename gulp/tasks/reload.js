'use strict';

module.exports = () => (
  $.gulp.task('reload', (done) => {
    $.server.reload();
    done();
  })
);
