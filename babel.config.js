'use strict';

module.exports = {
  ignore: ['./node_modules/**'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        helpers: true,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        loose: false,
        modules: 'auto',
        useBuiltIns: 'usage',
      },
    ],
  ],
};
