import getAudioTemplate from './audio';

const getArtistTemplate = (track, index) => (
  `<div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
    <label class="artist__name" for="answer-${index}">
      <img class="artist__picture" src="${track.image}" alt="${track.artist}">
      ${track.artist}
    </label>
  </div>`
);

export const updateCaption = () => 'Кто исполняет эту песню?';

export const getContentTemplate = (question) => {
  const { trackList, targetTrack } = question;

  return (
    `<div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      ${getAudioTemplate(targetTrack, true)}
    </div>
    <form class="game__artist">
      ${trackList.map((it, i) => getArtistTemplate(it, i + 1)).join('')}
    </form>`
  );
};

export const addAudioHandling = ($container) => {
  const $audioBlock = $container.querySelector('.game__track');
  const $button = $audioBlock.querySelector('button');
  const $audio = $audioBlock.querySelector('audio');

  $button.addEventListener('click', () => {
    if ($audio.paused) $audio.play();
    else $audio.pause();
    $button.classList.toggle(`track__button--play`);
    $button.classList.toggle(`track__button--pause`);
  });
};

const checkAnswer = (selectedAnswer, question) => {
  if (selectedAnswer === question.correctAnswer) return true;
  return false;
};

const createClickHandler = (question, onCorrect, onMistake) => (
  (evt) => {
    const answer = evt.currentTarget.value;
    const answerStatus = checkAnswer(answer, question);
    if (answerStatus) onCorrect(answerStatus);
    else onMistake();
  }
);

export const addAnswerHandler = ($container, question, onCorrect, onMistake) => {
  const $radioButtons = $container.querySelectorAll('.artist__input');

  $radioButtons.forEach(($el) => (
    $el.addEventListener('click', createClickHandler(question, onCorrect, onMistake))
  ));
};
