'use strict';

function getScreenTemplates() {
  const templateContainers = document.querySelectorAll('template');
  const templates = [];
  templateContainers.forEach((it) => templates.push(it.content));
  return templates;
}

const appEl = document.querySelector('.app');
const mainEl = appEl.querySelector('.main');
const screenTemplates = getScreenTemplates();
let currentScreenIndex = 0;

function renderScreen(index) {
  const screenEl = screenTemplates[index].cloneNode(true);
  mainEl.appendChild(screenEl);
}

renderScreen(currentScreenIndex);

function addScreenToggleHandlers() {
  const Buttons = {
    previous: appEl.querySelector(`.js-arrow-previous`),
    next: appEl.querySelector(`.js-arrow-next`),
  };

  Buttons.previous.addEventListener('click', () => {
    if (currentScreenIndex === 0) {
      currentScreenIndex = screenTemplates.length - 1;
    } else {
      currentScreenIndex -= 1;
    }
    const newScreenEl = screenTemplates[currentScreenIndex].cloneNode(true);
    mainEl.removeChild(mainEl.children[0]);
    mainEl.appendChild(newScreenEl);
  });

  Buttons.next.addEventListener('click', () => {
    if (currentScreenIndex === screenTemplates.length - 1) {
      currentScreenIndex = 0;
    } else {
      currentScreenIndex += 1;
    }
    const newScreenEl = screenTemplates[currentScreenIndex].cloneNode(true);
    mainEl.removeChild(mainEl.children[0]);
    mainEl.appendChild(newScreenEl);
  });
}

addScreenToggleHandlers();
