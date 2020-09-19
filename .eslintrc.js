'use strict';

module.exports = {
  extends: ['yialo/preset-web-babel'],
  globals: {
    process: 'readonly',
  },
  ignorePatterns: [
    '*.html',
    '/build/',
  ],
  overrides: [
    {
      files: ['./**/*.{spec,test}.js'],
      extends: ['yialo/preset-web-babel-jest'],
    },
    {
      files: [
        './*.js',
      ],
      extends: ['yialo/preset-node'],
      settings: {
        'import/resolver': 'node',
      },
    },
  ],
  settings: {
    'import/resolver': 'webpack',
  },
};
