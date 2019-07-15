'use strict';

const imageFormats = '{gif,jpeg,jpg,png,svg}';

module.exports = {
  'fonts': [`./fonts/*.{woff,woff2}`],
  'html': [`./*.html`],
  'images': [`./img/*.${imageFormats}`, `./*.ico`],
  'scripts-main': [`./js/main.js`],
  'scripts-all': [`./js/**/*.js`],
  'style-main': [`./sass/style.scss`],
  'style-all': [`./sass/**/*.scss`],
  'raw-images': [`./resources/raw/**/*.${imageFormats}`],
};
