import AudioView from '../_common/audio-view';
import QuestionView from './_question-view';
import ArtistView from '../_common/artist-view';

export default class QuestonArtistView extends QuestionView {
  _targetTrack = null;
  _correctAnswer = null;
  _audio = null;

  _artistViews = [];

  _$button = null;
  _$audio = null;

  constructor(question) {
    super();

    this._artistList = question.trackList;
    this._targetTrack = question.targetTrack;
    this._correctAnswer = question.correctAnswer;

    this._audio = new AudioView(this._targetTrack, true);
    this._createArtistViews();

    this._addAnswerHandler();
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
      view.onSelect = () => {
        const answerStatus = this._checkAnswer(view.artistId);
        this._onAnswer(answerStatus);
      };
    });
  }

  _checkAnswer(selectedAnswer) {
    return (selectedAnswer === this._correctAnswer);
  }

  _onClick() {
    if (this._audio.paused) {
      this._audio.play();
    } else {
      this._audio.pause();
    }

    this._$button.classList.toggle(`track__button--play`);
    this._$button.classList.toggle(`track__button--pause`);
  }

  _addButtonClickHandler() {
    this._$button = this._$container.querySelector('.track__button');
    this._$button.addEventListener('click', this._onClick);
  }

  _removeButtonClickHandler() {
    this._$button.removeEventListener('click', this._onClick);
    this._$button = null;
  }

  _addHandlers() {
    this._artistViews.forEach((view) => {
      view.render(this._$container);
    });

    this._addButtonClickHandler();
  }

  _removeHandlers() {
    this._artistViews.forEach((view) => {
      view.unrender();
    });

    this._removeButtonClickHandler();
  }

  _bindHandlers() {
    this._onClick = this._onClick.bind(this);
  }
}
