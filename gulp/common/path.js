'use strict';

const Format = {
  BITMAP: 'gif,jpeg,jpg,png',
  FONTS: 'woff,woff2',
};

module.exports = {
  fonts: `./source/fonts/*.{${Format.FONTS}}`,
  markup: `./source/*.html`,
  images: {
    bitmap: `./source/img/*.{${Format.BITMAP}}`,
    vector: `./source/img/*.svg`,
    raw: `./resources/raw/**/*.{${Format.BITMAP},svg}`,
  },
  output: {
    root: './build',
    images: './source/img',
  },
  scripts: {
    all: `./source/js/**/*.js`,
    main: `./source/js/main.js`,
  },
  styles: {
    all: `./source/styles/**/*.scss`,
    main: `./source/styles/app.scss`,
  },
  test: `./source/js/**/*.test.js`,
};
