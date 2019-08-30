import AudioView from '../views/audio-view';
import ArtistView from '../views/artist-view';

export const updateCaption = () => 'Кто исполняет эту песню?';

export const getContentTemplate = (question) => {
  const { trackList, targetTrack } = question;
  const audio = new AudioView(targetTrack, true);

  const formMarkup = trackList
    .map((it, i) => {
      const artist = new ArtistView(it, i + 1);
      return artist.template;
    })
    .join('');

  return (
    `<div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      ${audio.template}
    </div>
    <form class="game__artist">
      ${formMarkup}
    </form>`
  );
};

const addAudioHandlers = ($container) => {
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

const checkAnswer = (selectedAnswer, question) => (selectedAnswer === question.correctAnswer);

const createClickHandler = (question, callback) => (
  (evt) => {
    const answer = evt.currentTarget.value;
    const answerStatus = checkAnswer(answer, question);
    callback(answerStatus);
  }
);

const addAnswerHandler = ($container, question, onAnswer) => {
  const $radioButtons = $container.querySelectorAll('.artist__input');

  $radioButtons.forEach(($el) => (
    $el.addEventListener('click', createClickHandler(question, onAnswer))
  ));
};

export const bind = ($container, question, onAnswer) => {
  addAudioHandlers($container);
  addAnswerHandler($container, question, onAnswer);
};
