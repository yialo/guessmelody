import TrackView from '../views/track-view';

const addAudioHandlers = ($container) => {
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

export const getContentTemplate = (question) => {
  const formMarkup = question.trackList
    .map((it, i) => {
      const track = new TrackView(it, i + 1);
      return track.template;
    })
    .join('');

  return (
    `<form class="game__tracks">
      ${formMarkup}
      <button class="game__submit button" type="submit">Ответить</button>
    </form>`
  );
};

const checkAnswer = (selectedAnswers, question) => {
  const { correctAnswers } = question;

  return (
    selectedAnswers.every((it) => correctAnswers.includes(it))
    && correctAnswers.every((it) => selectedAnswers.includes(it))
  );
};

const getAnswerStatus = ($checkboxes, question, callback) => {
  const answers = [...$checkboxes]
    .filter(($el) => $el.checked)
    .map(($el) => $el.value);
  const answerStatus = checkAnswer(answers, question);
  callback(answerStatus);
};

const setClickabilityState = ($el, isClickable) => {
  if (isClickable) $el.removeAttribute('disabled');
  else $el.setAttribute('disabled', 'disabled');
};

const checkSelectedCheckboxPresence = ($checkboxes) => $checkboxes.some(($el) => $el.checked);

const addCheckboxChangeHandlers = ($checkboxes, $button) => {
  const onCheckboxChange = () => {
    if (checkSelectedCheckboxPresence($checkboxes)) setClickabilityState($button, true);
    else setClickabilityState($button, false);
  };
  $checkboxes.forEach(($el) => $el.addEventListener('change', onCheckboxChange));
};

const addAnswerHandler = ($container, question, onAnswer) => {
  const $form = $container.querySelector('.game__tracks');
  const $checkboxes = [...$form.querySelectorAll('.game__input')];
  const $button = $form.querySelector('.game__submit');

  setClickabilityState($button, false);

  addCheckboxChangeHandlers($checkboxes, $button);

  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    getAnswerStatus($checkboxes, question, onAnswer);
  });
};

export const bind = ($container, question, onAnswer) => {
  addAudioHandlers($container);
  addAnswerHandler($container, question, onAnswer);
};
