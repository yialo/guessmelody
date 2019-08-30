// TODO:
//  remove unnecessary functions (or all module)
//  after all 'question' and 'result' elements would become formatted as classes

const $app = document.querySelector('.app');
const $main = $app.querySelector('.main');

export const createElementFromTemplate = (template) => {
  const $container = document.createElement('template');
  $container.innerHTML = template;
  return $container.content.firstChild;
};

export const changeScreen = ($screen) => {
  $main.innerHTML = ``;
  $main.appendChild($screen);
};

export const getRandomInteger = (max, min = 0) => {
  const delta = max - min;
  return min + Math.round(Math.random() * delta);
};

export const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
