export const Keycode = {
  LEFT: 37,
  RIGHT: 39,
};

const appElement = document.querySelector('.app');
const mainElement = appElement.querySelector('.main');

export function render(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container;
}

export function changeScreen(screenElement) {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screenElement);
}
