module.exports = {
  plugins: {
    'autoprefixer': {},
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
