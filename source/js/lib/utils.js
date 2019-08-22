const $app = document.querySelector('.app');
export const $main = $app.querySelector('.main');

export const renderElementFromTemplate = (template) => {
  const $template = document.createElement('template');
  $template.innerHTML = template;
  return $template.content.firstChild;
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
