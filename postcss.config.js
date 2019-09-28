'use strict';

const normalize = require('postcss-normalize');

const importConfig = normalize().postcssImport();

module.exports = (ctx) => ({
  plugins: {
    'postcss-import': importConfig,
    'postcss-advanced-variables': {
      disable: ['@if', '@else', '@for', '@each'],
    },
    'postcss-color-function': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-media-queries': true,
        'custom-selectors': true,
        'nesting-rules': true,
      },
    },
    'cssnano': ctx.env === 'production' ? {} : false,
  },
});
