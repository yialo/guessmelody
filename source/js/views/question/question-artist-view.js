import AudioView from '../_common/audio-view';
import QuestionView from './_question-view';
import ArtistView from '../_common/artist-view';

export default class QuestonArtistView extends QuestionView {
  _FormItemView = ArtistView;
  _targetTrack = null;
  _correctAnswer = null;
  _audio = null;

  _$radioButtons = [];
  _$audioBlock = null;
  _$button = null;
  _$audio = null;

  constructor(question) {
    super();

    this._formList = question.artistList;
    this._targetTrack = question.targetTrack;
    this._correctAnswer = question.correctAnswer;
    this._audio = new AudioView(this._targetTrack, true);
  }

  get _caption() {
    return 'Кто исполняет эту песню?';
  }

  get _contentTemplate() {
    return (
      `<div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        ${this._audio.template}
      </div>
      <form class="game__artist">
        ${this._formTemplate}
      </form>`
    );
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
