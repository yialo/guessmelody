'use strict';

const { series, task, watch } = $.gulp;
const {
  files,
  fonts,
  images: { bitmap, vector },
  markup,
  scripts: { all: scripts },
  styles: { all: styles },
} = $.path;

const addWatchers = () => {
  watch(markup, series('markup'));
  watch(styles, series('styles'));
  watch(scripts, series('scripts'));
  watch(files, series('watch-files'));
  watch(fonts, series('watch-fonts'));
  watch(bitmap, series('watch-bitmaps'));
  watch(vector, series('watch-vector'));
};

const serverOptions = {
  server: $.path.output.root,
  notify: false,
  open: false,
  port: 3502,
  ui: false,
};

module.exports = () => (
  task('serve', () => {
    $.server.init(serverOptions);
    addWatchers();
  })
);
