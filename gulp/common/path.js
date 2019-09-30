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
  raw: {
    input: `./resources/raw/input/*.{${Format.BITMAP},svg}`,
    output: `./resources/raw/output`,
  },
  root: `./build`,
  scripts: {
    all: `./source/js/**/*.js`,
    main: `./source/js/index.js`,
    outputName: 'bundle',
  },
  styles: {
    all: `./source/css/**/*.css`,
    main: `./source/css/app.css`,
  },
  test: `./source/js/**/*.test.js`,
};
