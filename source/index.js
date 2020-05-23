/**
 * TODO:
 * - Возможно, выделить шаблоны в отдельные файлы
 * - Fix test files
 * - Rework abstract classes with composition, because of Interface segregation principle
 */

import App from './js/App.js';

import './scss/index.scss';
import './favicon.ico';

const app = new App();
app.init();
