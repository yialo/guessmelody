const path = require('path');

const { series, task, watch } = $.gulp;
const {
  files,
  fonts,
  images: { bitmap, vector },
  markup,
  scripts: { all: scripts },
  styles: { all: styles },
} = $.path;

const onFileDelete = (filepath) => {
  const srcAbsPath = path.resolve('./source');
  const filePathFromSrc = path.relative(srcAbsPath, filepath);
  const destFilePath = path.resolve($.path.dist, filePathFromSrc);

  $.del.sync(destFilePath);
};

const addWatchers = () => {
  watch(markup, series('markup'));
  watch([styles, `./postcss.config.js`], series('styles'));
  watch(scripts, series('scripts'));

  const staticWatchers = [
    watch(files, series('renew:files')),
    watch(fonts, series('renew:fonts')),
    watch(bitmap, series('renew:bitmaps')),
    watch(vector, series('renew:vector')),
  ];

  staticWatchers.forEach((watcher) => {
    watcher.on('unlink', onFileDelete);
  });
};

const serverOptions = {
  server: $.path.dist,
  notify: false,
  open: false,
  port: 3502,
  ui: false,
};

module.exports = () => {
  task('serve', () => {
    $.server.init(serverOptions);
    addWatchers();
  });
};
