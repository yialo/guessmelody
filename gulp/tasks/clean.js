'use strict';

module.exports = () => $.gulp.task('clean', () => $.del($.path.output.root));
