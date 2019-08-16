import { getScreen, addBackLinkClickHandler } from '../lib/utils';

const template = (
  `<section class="game game--genre">
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value">
        <span class="timer__mins">05</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">00</span>
      </div>

      <div class="game__mistakes">
        <div class="wrong"></div>
        <div class="wrong"></div>
        <div class="wrong"></div>
      </div>
    </header>

    <section class="game__screen">
      <h2 class="game__title">Выберите инди-рок треки</h2>
      <form class="game__tracks">
        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-1">
            <label class="game__check" for="answer-1">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-2">
            <label class="game__check" for="answer-2">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--pause" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-3">
            <label class="game__check" for="answer-3">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-4">
            <label class="game__check" for="answer-4">Отметить</label>
          </div>
        </div>

        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>`
);

export default function (handler) {
  const { goBack, goForward } = handler;
  const container = getScreen(template);

  addBackLinkClickHandler(container, goBack);

  const form = container.querySelector('.game__tracks');
  const checkboxes = [...form.querySelectorAll('.game__input')];
  const submitButton = form.querySelector('.game__submit');

  submitButton.setClickabilityState = (isClickable) => {
    if (isClickable) submitButton.removeAttribute('disabled');
    else submitButton.setAttribute('disabled', 'disabled');
  };
  submitButton.setClickabilityState(false);

  const checkSelectedCheckboxPresence = () => checkboxes.some((el) => el.checked);

  const onCheckboxChange = () => {
    if (checkSelectedCheckboxPresence()) submitButton.setClickabilityState(true);
    else submitButton.setClickabilityState(false);
  };
  checkboxes.forEach((el) => el.addEventListener('change', onCheckboxChange));

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    goForward();
  });

  return container;
}
