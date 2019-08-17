const $app = document.querySelector('.app');
const $main = $app.querySelector('.main');

export const renderElementFromTemplate = (template) => {
  const $template = document.createElement('template');
  $template.innerHTML = template;
  return $template.content.firstChild;
};

export const getScreen = (template) => {
  const $template = document.createElement('template');
  $template.innerHTML = template;
  return $template.content.firstChild;
};

export const changeScreen = ($screen) => {
  $main.innerHTML = ``;
  $main.appendChild($screen);
};

export const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const addBackLinkClickHandler = ($container, handler) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => handler());
};
