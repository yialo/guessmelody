const padStartWithZero = (num) => String(num).padStart(2, '0');

const getTimerPartValue = (state, partial) => {
  const rawValue = state[partial];
  return padStartWithZero(rawValue);
};

export const updateTimerView = (state, $container) => {
  const partialClassNameMap = new Map([
    ['seconds', 'mins'],
    ['minutes', 'secs'],
  ]);
  const $timer = $container.querySelector(`.timer__value`);

  partialClassNameMap.forEach((value, key) => {
    const $el = $timer.querySelector(`.timer__${value}`);
    $el.textContent = getTimerPartValue(state, key);
  });
};

const getMistakesTemplate = (state) => (
  `${
    new Array(state.mistakes)
      .fill(`<div class="wrong"></div>`)
      .join('')
  }`
);

export const updateMistakesView = (state, $container) => {
  const $mistakesContainer = $container.querySelector(`.game__mistakes`);
  $mistakesContainer.innerHTML = getMistakesTemplate(state);
};

export const getTemplate = (state) => {
  const getTimerPart = (partial) => getTimerPartValue(state, partial);

  return (
    `<header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value">
        <span class="timer__mins">${getTimerPart('minutes')}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${getTimerPart('seconds')}</span>
      </div>
      <div class="game__mistakes">${getMistakesTemplate(state)}</div>
    </header>`
  );
};

export const addLogoClickHandler = ($container, onClick) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => onClick());
};
