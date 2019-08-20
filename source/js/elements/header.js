const padStartWithZero = (num) => String(num).padStart(2, '0');

export const getTimerTemplate = (state) => {
  const { minutes: rawMinutes, seconds: rawSeconds } = state;
  const minutes = padStartWithZero(rawMinutes);
  const seconds = padStartWithZero(rawSeconds);

  return (
    `<span class="timer__mins">${minutes}</span>
    <span class="timer__dots">:</span>
    <span class="timer__secs">${seconds}</span>`
  );
};

export const updateTimerView = ($container, state) => {
  const $timerContainer = $container.querySelector('.timer__value');
  $timerContainer.innerHTML = getTimerTemplate(state);
};

export const getMistakesTemplate = (state) => (
  `${
    new Array(state.mistakes)
      .fill(`<div class="wrong"></div>`)
      .join('')
  }`
);

export const updateMistakesView = ($container, state) => {
  const $mistakesContainer = $container.querySelector('.game__mistakes');
  $mistakesContainer.innerHTML = getMistakesTemplate(state);
};

export const getTemplate = (timer = '', mistakes = '') => (
  `<header class="game__header">
    <a class="game__back" href="#">
      <span class="visually-hidden">Сыграть ещё раз</span>
      <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
    </a>

    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
    </svg>

    <div class="timer__value">${timer}</div>
    <div class="game__mistakes">${mistakes}</div>
  </header>`
);
