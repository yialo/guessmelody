import getAudioTemplate from './audio';

const getTrackTemplate = (track, number) => {
  const buttonStateModifier = (number === 1) ? 'play' : '';
  const isAudioAutoplay = (number === 1);
  return (
    `<div class="track">
      <button class="track__button track__button--${buttonStateModifier}" type="button"></button>
      <div class="track__status">
        ${getAudioTemplate(track, isAudioAutoplay)}
      </div>
      <div class="game__answer">
        <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${number}" id="answer-${number}">
        <label class="game__check" for="answer-${number}">Отметить</label>
      </div>
    </div>`
  );
};

export const addAudioHandlers = ($container) => {
  const $audioBlocks = $container.querySelectorAll('.track');

  $audioBlocks.forEach(($it) => {
    $it.$button = $it.querySelector('button');
    $it.$audio = $it.querySelector('audio');
  });

  $audioBlocks.forEach(($it) => {
    const { $audio, $button } = $it;
    $button.addEventListener('click', () => {
      const $otherBlocks = new Set([...$audioBlocks]);
      $otherBlocks.delete($it);

      if ($audio.paused) {
        $otherBlocks.forEach(($el) => $el.$audio.pause());
        $audio.play();
        $button.classList.add(`track__button--play`);
        $button.classList.remove(`track__button--pause`);
      } else {
        $audio.pause();
        $button.classList.remove(`track__button--play`);
        $button.classList.add(`track__button--pause`);
      }
      $otherBlocks.forEach(($el) => {
        $el.$button.classList.remove(`track__button--play`);
        $el.$button.classList.remove(`track__button--pause`);
      });
    });
  });
};

export const updateCaption = (question) => `Выберите ${question.targetGenre} треки`;

export const getContentTemplate = (question) => (
  `<form class="game__tracks">
    ${question.trackList.map((it, i) => getTrackTemplate(it, i + 1)).join('')}
    <button class="game__submit button" type="submit">Ответить</button>
  </form>`
);

const checkAnswer = (selectedAnswers, question) => {
  const { correctAnswers } = question;

  return (
    selectedAnswers.every((it) => correctAnswers.includes(it))
    && correctAnswers.every((it) => selectedAnswers.includes(it))
  );
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

const setClickabilityState = ($el, isClickable) => {
  if (isClickable) $el.removeAttribute('disabled');
  else $el.setAttribute('disabled', 'disabled');
};

export const addAnswerHandlers = ($container, question, onCorrect, onMistake) => {
  const $form = $container.querySelector('.game__tracks');
  const $checkboxes = [...$form.querySelectorAll('.game__input')];
  const $button = $form.querySelector('.game__submit');

  setClickabilityState($button, false);

  const checkSelectedCheckboxPresence = () => $checkboxes.some(($el) => $el.checked);

  const onCheckboxChange = () => {
    if (checkSelectedCheckboxPresence()) setClickabilityState($button, true);
    else setClickabilityState($button, false);
  };
  $checkboxes.forEach(($el) => $el.addEventListener('change', onCheckboxChange));

  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    onFormSubmit($container, question, onCorrect, onMistake);
  });
};
