module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-advanced-variables': {
      disable: ['@if', '@else', '@for', '@each'],
    },
    'postcss-color-function': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-media-queries': true,
        'custom-properties': false,
        'custom-selectors': true,
        'matches-pseudo-class': true,
        'nesting-rules': true,
        'not-pseudo-class': true,
      },
    },
    'cssnano': (
      process.env.NODE_ENV === 'production'
        ? {
          preset: [
            'default',
            {
              discardComments: true,
            },
            {
              normalizeCharset: {
                add: true,
              },
            },
          ],
        }
        : false
    ),
  },
};
