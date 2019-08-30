import ArtistView from './artist-view';
import AudioView from './audio-view';
import TypeView from './question-type-view';

const CAPTION = 'Кто исполняет эту песню?';

export default class QuestonArtistView extends TypeView {
  constructor(...args) {
    super(ArtistView, ...args);

    const [question] = args;
    this._targetTrack = question.targetTrack;
    this._correctAnswer = question.correctAnswer;
    this._audio = new AudioView(this._targetTrack, true);
  }

  get caption() {
    this._caption = CAPTION;
    return this._caption;
  }

  get template() {
    this._template = (
      `<div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        ${this._audio.template}
      </div>
      <form class="game__artist">
        ${this.formMarkup}
      </form>`
    );
    return this._template;
  }

  _addAnswerHandler() {
    this._$radioButtons = this._$container.querySelectorAll('.artist__input');

    this._$radioButtons.forEach(($el) => (
      $el.addEventListener('click', this._createClickHandler(this._question, this._onAnswer))
    ));
  }

  _addAudioHandlers() {
    this._$audioBlock = this._$container.querySelector('.game__track');
    this._$button = this._$audioBlock.querySelector('button');
    this._$audio = this._$audioBlock.querySelector('audio');

    this._$button.addEventListener('click', () => {
      if (this._$audio.paused) this._$audio.play();
      else this._$audio.pause();
      this._$button.classList.toggle(`track__button--play`);
      this._$button.classList.toggle(`track__button--pause`);
    });
  }

  _checkAnswer(selectedAnswer) {
    return (selectedAnswer === this._correctAnswer);
  }

  _createClickHandler() {
    return (evt) => {
      const answer = evt.currentTarget.value;
      const answerStatus = this._checkAnswer(answer);
      this._onAnswer(answerStatus);
    };
  }
}
