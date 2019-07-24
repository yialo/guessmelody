const $app = document.querySelector('.app');
const $main = $app.querySelector('.main');

export function getScreen(template) {
  const $template = document.createElement('template');
  $template.innerHTML = template;
  return $template.content.firstChild;
}

export function changeScreen($screen) {
  $main.innerHTML = ``;
  $main.appendChild($screen);
}

export function getRandomArrayElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function addBackLinkClickHandler($container, handler) {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => handler());
}
