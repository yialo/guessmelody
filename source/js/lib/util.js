const appElement = document.querySelector('.app');
const mainElement = appElement.querySelector('.main');

export function getScreen(template) {
  const tempElement = document.createElement('template');
  tempElement.innerHTML = template;
  return tempElement.content.firstChild.cloneNode(true);
}

export function changeScreen(screenElement) {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screenElement);
}

export function getRandomArrayElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
