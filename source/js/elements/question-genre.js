const getTrackTemplate = (index, playState) => (
  `<div class="track">
    <button class="track__button track__button--${playState}" type="button"></button>
    <div class="track__status">
      <audio></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${index}" id="answer-${index}">
      <label class="game__check" for="answer-${index}">Отметить</label>
    </div>
  </div>`
);

export const getContentTemplate = ({ genreName, tracks }) => (
  `<h2 class="game__title">Выберите ${genreName} треки</h2>
  <form class="game__tracks">
    ${tracks.map((it, i) => getTrackTemplate(i + 1, it)).join('')}
    <button class="game__submit button" type="submit">Ответить</button>
  </form>`
);

export const bindHandlers = ($container, onSubmit) => {
  const $form = $container.querySelector('.game__tracks');
  const $checkboxes = [...$form.querySelectorAll('.game__input')];
  const $button = $form.querySelector('.game__submit');

  $button.setClickabilityState = (isClickable) => {
    if (isClickable) $button.removeAttribute('disabled');
    else $button.setAttribute('disabled', 'disabled');
  };
  $button.setClickabilityState(false);

  const checkSelectedCheckboxPresence = () => $checkboxes.some(($el) => $el.checked);

  const onCheckboxChange = () => {
    if (checkSelectedCheckboxPresence()) $button.setClickabilityState(true);
    else $button.setClickabilityState(false);
  };
  $checkboxes.forEach(($el) => $el.addEventListener('change', onCheckboxChange));

  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    onSubmit();
  });
};
