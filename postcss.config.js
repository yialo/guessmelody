'use strict';

const advancedVars = require('postcss-advanced-variables');
const colorFunc = require('postcss-color-function');
const importer = require('postcss-import');
const normalize = require('postcss-normalize');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    importer(
      normalize().postcssImport()
    ),
    advancedVars({
      disable: ['@if', '@else', '@for', '@each'],
    }),
    colorFunc(),
    presetEnv({
      stage: 3,
      features: {
        'custom-media-queries': true,
        'custom-selectors': true,
        'nesting-rules': true,
      },
    }),
  ],
};
