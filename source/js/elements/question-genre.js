import createAudioTemplate from './audio';

const getTrackTemplate = (track, index) => {
  const buttonStateModifier = (index === 0) ? 'pause' : 'play';
  return (
    `<div class="track">
      <button class="track__button track__button--${buttonStateModifier}" type="button"></button>
      <div class="track__status">
        ${createAudioTemplate(track)}
      </div>
      <div class="game__answer">
        <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${index}" id="answer-${index}">
        <label class="game__check" for="answer-${index}">Отметить</label>
      </div>
    </div>`
  );
};

export const getCaptionText = ({ targetGenre }) => `Выберите ${targetGenre} треки`;

export const getContentTemplate = ({ trackList }) => (
  `<form class="game__tracks">
    ${trackList.map((it, i) => getTrackTemplate(it, i)).join('')}
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
