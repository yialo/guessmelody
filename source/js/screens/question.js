import { getScreen } from '../lib/utils';
import getHeader from './header';

const addBackLinkClickHandler = ($container, handler) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => handler());
};

const template = {
  getGenre() {
    return (
      `<section class="game game--genre">
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
  },
  getArtist() {
    return (
      `<section class="game game--artist">
        <section class="game__screen">
          <h2 class="game__title">Кто исполняет эту песню?</h2>
          <div class="game__track">
            <button class="track__button track__button--play" type="button"></button>
            <audio></audio>
          </div>

          <form class="game__artist">
            <div class="artist">
              <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-1" id="answer-1">
              <label class="artist__name" for="answer-1">
                <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
                Пелагея
              </label>
            </div>

            <div class="artist">
              <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-2" id="answer-2">
              <label class="artist__name" for="answer-2">
                <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
                Краснознаменная дивизия имени моей бабушки
              </label>
            </div>

            <div class="artist">
              <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-3" id="answer-3">
              <label class="artist__name" for="answer-3">
                <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
                Lorde
              </label>
            </div>
          </form>
        </section>
      </section>`
    );
  },
};

export default {
  getGenre(handler) {
    const { goBack, goForward } = handler;
    const $container = getScreen(template.getGenre());

    const $header = getHeader();
    $container.prepend($header);

    addBackLinkClickHandler($container, goBack);

    const form = $container.querySelector('.game__tracks');
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

    return $container;
  },
  getArtist(handler) {
    const { goBack, goForward } = handler;
    const $container = getScreen(template.getArtist());

    const $header = getHeader();
    $container.prepend($header);

    addBackLinkClickHandler($container, goBack);

    const radioButtons = $container.querySelectorAll('.artist__input');

    radioButtons.forEach((el) => el.addEventListener('click', goForward));

    return $container;
  },
};
