'use strict';

const Format = {
  BITMAP: 'gif,jpeg,jpg,png',
  FONTS: 'woff,woff2',
};

module.exports = {
  files: `./source/files/**/*`,
  fonts: `./source/fonts/*.{${Format.FONTS}}`,
  markup: `./source/*.html`,
  images: {
    bitmap: [
      `./source/img/*.{${Format.BITMAP}}`,
      `./source/*.ico`,
    ],
    vector: `./source/img/*.svg`,
  },
  output: {
    root: './build',
    images: './source/img',
  },
  raw: {
    input: `./resources/raw/input/*.{${Format.BITMAP},svg}`,
    output: `./resources/raw/output`,
  },
  scripts: {
    all: `./source/js/**/*.js`,
    main: `./source/js/index.js`,
    outputName: 'bundle',
  },
  styles: {
    all: `./source/styles/**/*.scss`,
    main: `./source/styles/app.scss`,
  },
  test: `./source/js/**/*.test.js`,
};
