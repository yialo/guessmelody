import AudioView from '../_common/audio-view';
import QuestionView from './_question-view';
import ArtistView from '../_common/artist-view';

export default class QuestonArtistView extends QuestionView {
  _targetTrack = null;
  _correctAnswer = null;
  _audio = null;

  _artistViews = [];

  _$audioBlock = null;
  _$button = null;
  _$audio = null;

  constructor(question) {
    super();

    this._artistList = question.artistList;
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

  get _formTemplate() {
    return this._artistViews
      .map((view) => view.template)
      .join('');
  }

  _createArtistViews() {
    this._artistViews = this._artistList.map((it, i) => new ArtistView(it, i + 1));
  }

  _addAnswerHandler() {
    this._artistViews.forEach((view) => {
      view.onClick = () => {
        const answerStatus = this._checkAnswer(view.artistId);
        this._onAnswer(answerStatus);
      };
    });
  }

  _addAudioHandler() {
    this._$audioBlock = this._$container.querySelector('.game__track');
    this._$button = this._$audioBlock.querySelector('button');
    this._$audio = this._$audioBlock.querySelector('audio');

    this._$button.addEventListener('click', () => {
      if (this._$audio.paused) {
        this._$audio.play();
      } else {
        this._$audio.pause();
      }

      this._$button.classList.toggle(`track__button--play`);
      this._$button.classList.toggle(`track__button--pause`);
    });
  }

  _checkAnswer(selectedAnswer) {
    return (selectedAnswer === this._correctAnswer);
  }

  // TODO: дописать метод
  _addHandlers() {
    // this._artistViews.forEach() {

    // }
  }

  _removeHandlers() {}
}
