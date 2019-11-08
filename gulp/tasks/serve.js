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
  watch([styles, `./postcss.config.js`], series('styles'));
  watch(scripts, series('scripts'));
  watch(files, series('renew:files'));
  watch(fonts, series('renew:fonts'));
  watch(bitmap, series('renew:bitmaps'));
  watch(vector, series('renew:vector'));
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
