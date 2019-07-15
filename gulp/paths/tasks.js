'use strict';

const base = './gulp/tasks/';

// Order matters!
module.exports = [
  `${base}markup.js`,
  `${base}scripts.js`,
  `${base}styles.js`,
  `${base}clean.js`,
  `${base}fonts.js`,
  `${base}images.js`,
  `${base}serve.js`,
  `${base}imagemin.js`,
  `${base}test.js`,
];
