'use strict';

const Keycode = {
  LEFT: 37,
  RIGHT: 39,
};

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

const ArrowButton = function (direction) {
  this.direction = direction;
  this.getEl();
  this.el.addEventListener('click', this.changeScreen.bind(this));
  document.addEventListener('keydown', this.keyPressHandler.bind(this));
};
ArrowButton.prototype = {
  screenCheckerMap: {
    'previous': () => {
      if (currentScreenIndex === 0) {
        currentScreenIndex = screenTemplates.length - 1;
      } else {
        currentScreenIndex -= 1;
      }
    },
    'next': () => {
      if (currentScreenIndex === screenTemplates.length - 1) {
        currentScreenIndex = 0;
      } else {
        currentScreenIndex += 1;
      }
    },
  },
  keyMap: {
    'previous': 'LEFT',
    'next': 'RIGHT',
  },
  getEl() {
    this.el = appEl.querySelector(`.js-arrow-${this.direction}`);
  },
  changeScreen() {
    const checkScreen = this.screenCheckerMap[this.direction];
    checkScreen();
    const newScreenEl = screenTemplates[currentScreenIndex].cloneNode(true);
    mainEl.removeChild(mainEl.children[0]);
    mainEl.appendChild(newScreenEl);
  },
  keyPressHandler(evt) {
    const keyName = this.keyMap[this.direction];
    if (evt.keyCode === Keycode[keyName]) {
      evt.preventDefault();
      this.changeScreen();
    }
  },
};

const previousScreenButton = new ArrowButton('previous');
const nextScreenButton = new ArrowButton('next');
