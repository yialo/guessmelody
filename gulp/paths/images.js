'use strict';

const Format = {
  bitmap: 'gif,jpeg,jpg,png',
  vector: 'svg',
};

module.exports = {
  'bitmap': [`./source/img/*.{${Format.bitmap}}`, `./source/*.ico`],
  'vector': [`./source/img/*.${Format.vector}`],
  'raw': [`./resources/raw/**/*.{${Format.bitmap},${Format.vector}}`],
};
