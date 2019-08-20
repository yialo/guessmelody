import createAudioTemplate from './audio';

const getTrackTemplate = (track, number) => {
  const buttonStateModifier = (number === 1) ? 'pause' : 'play';
  return (
    `<div class="track">
      <button class="track__button track__button--${buttonStateModifier}" type="button"></button>
      <div class="track__status">
        ${createAudioTemplate(track)}
      </div>
      <div class="game__answer">
        <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${number}" id="answer-${number}">
        <label class="game__check" for="answer-${number}">Отметить</label>
      </div>
    </div>`
  );
};

export const getCaptionText = (question) => `Выберите ${question.targetGenre} треки`;

export const getContentTemplate = (question) => (
  `<form class="game__tracks">
    ${question.trackList.map((it, i) => getTrackTemplate(it, i + 1)).join('')}
    <button class="game__submit button" type="submit">Ответить</button>
  </form>`
);

const checkAnswer = (selectedAnswers, question) => {
  const { correctAnswers } = question;

  for (const it of selectedAnswers) {
    if (!correctAnswers.includes(it)) return false;
  }

  for (const it of correctAnswers) {
    if (!selectedAnswers.includes(it)) return false;
  }

  return true;
};

const getUserAnswers = ($container) => {
  const $checkedInputs = $container.querySelectorAll('input[name=answer]:checked');
  return [...$checkedInputs].map((it) => it.value);
};

const onFormSubmit = ($container, question, onCorrect, onMistake) => {
  const answers = getUserAnswers($container);
  const answerStatus = checkAnswer(answers, question);
  if (answerStatus) onCorrect(answerStatus);
  else onMistake();
};

export const addAnswerHandler = ($container, question, onCorrect, onMistake) => {
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
    onFormSubmit($container, question, onCorrect, onMistake);
  });
};
