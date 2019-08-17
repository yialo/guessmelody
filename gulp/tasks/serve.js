'use strict';

const { series, task, watch } = $.gulp;
const {
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
  watch(fonts, series('watch-fonts'));
  watch(bitmap, series('watch-bitmaps'));
  watch(vector, series('watch-vector'));
};

const serverOptions = {
  server: $.path.output.root,
  notify: false,
  open: true,
  port: 3502,
  ui: false,
};

module.exports = () => (
  task('serve', () => {
    $.server.init(serverOptions);
    addWatchers();
  })
);
