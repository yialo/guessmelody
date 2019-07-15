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
  this.createEl();
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
  text: {
    'previous': `&lt;`,
    'next': `&gt;`,
  },
  createEl() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add(`arrows__btn`, `js-arrow-${this.direction}`);
    button.innerHTML = this.text[this.direction];
    this.el = button;
  },
  changeScreen() {
    const checkScreen = this.screenCheckerMap[this.direction];
    checkScreen();
    const newScreenEl = screenTemplates[currentScreenIndex].cloneNode(true);
    mainEl.innerHTML = ``;
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

function addScreenControls() {
  const container = document.createElement('div');
  container.classList.add('arrows__wrap');

  const styleEl = document.createElement('style');
  styleEl.textContent =
`.arrows__wrap {
  position: absolute;
  top: 135px;
  left: 50%;
  margin-left: -56px;
}

.arrows__btn {
  background-color: white;
  border: 2px solid black;
  padding: 5px 20px;
}`;

  const previousScreenButton = new ArrowButton('previous');
  const nextScreenButton = new ArrowButton('next');

  [styleEl, previousScreenButton.el, nextScreenButton.el]
    .forEach((el) => container.appendChild(el));
  appEl.appendChild(container);
}

addScreenControls();
