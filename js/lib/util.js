export const Keycode = {
  LEFT: 37,
  RIGHT: 39,
};

const appElement = document.querySelector('.app');
const mainElement = appElement.querySelector('.main');

export function render(template) {
  const tempElement = document.createElement('template');
  tempElement.innerHTML = template;
  return tempElement.content;
}

export function changeScreen(screenElement) {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screenElement);
}
