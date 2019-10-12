import AudioView from '../_common/audio-view';
import QuestionView from './_question-view';
import ArtistView from '../_common/artist-view';

export default class QuestonArtistView extends QuestionView {
  _targetTrack = null;
  _correctAnswer = null;
  _audio = null;

  _artistViews = [];

  _$audioButton = null;

  constructor(question) {
    super();

    this._artistList = question.trackList;
    this._targetTrack = question.targetTrack;
    this._correctAnswer = question.correctAnswer;

    this._audio = new AudioView(this._targetTrack, true);
    this._createArtistViews();

    this._addAnswerHandlers();
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

  _addAnswerHandlers() {
    this._artistViews.forEach((view) => {
      view.onSelect = () => {
        const answer = view.artistId;

        this._onAnswer(answer);
      };
    });
  }

  _onClick() {
    if (this._audio.paused) {
      this._audio.play();
    } else {
      this._audio.pause();
    }

    this._$audioButton.classList.toggle(`track__button--play`);
    this._$audioButton.classList.toggle(`track__button--pause`);
  }

  _addAudioHandler() {
    if (!this._$audioButton) {
      this._$audioButton = this._$container.querySelector('.track__button');
    }

    this._$audioButton.addEventListener('click', this._onClick);
  }

  _removeAudioHandler() {
    this._$audioButton.removeEventListener('click', this._onClick);
  }

  _addHandlers() {
    this._artistViews.forEach((view) => {
      view.render(this._$container);
    });

    this._addAudioHandler();
  }

  _removeHandlers() {
    this._artistViews.forEach((view) => {
      view.unrender();
    });

    this._removeAudioHandler();
  }

  _bindHandlers() {
    this._onClick = this._onClick.bind(this);
  }
}
