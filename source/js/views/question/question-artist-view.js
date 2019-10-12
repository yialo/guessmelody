import AudioView from '../_common/audio-view';
import QuestionView from './_question-view';
import ArtistView from '../_common/artist-view';
import TrackButtonView from '../_common/track-button-view';

export default class QuestonArtistView extends QuestionView {
  _targetTrack = null;

  _audio = null;
  _button = null;
  _artistViews = [];

  _$audioButton = null;

  constructor(question) {
    super();

    this._artistList = question.trackList;
    this._targetTrack = question.targetTrack;
    this._correctAnswer = question.correctAnswer;

    this._button = new TrackButtonView();
    this._button.onClick = () => {
      if (this._audioState === 'play') {
        this._audio.pause();
        this._button.pause();
      } else if (this._audioState === 'pause') {
        this._audio.play();
        this._button.play();
      } else if (this._audioState === 'stop') {
        this._audio.play();
        this._button.play();
      }
    };

    this._audio = new AudioView(this._targetTrack, true);

    this._createArtistViews();
    this._addAtristViewHandlers();
  }

  get _caption() {
    return 'Кто исполняет эту песню?';
  }

  get _contentTemplate() {
    return (
      `<div class="game__track">
        ${this._button.template}
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

  get _audioState() {
    return this._audio.state;
  }

  _createArtistViews() {
    this._artistViews = this._artistList
      .map((it, i) => new ArtistView(it, i + 1));
  }

  _addAtristViewHandlers() {
    this._artistViews.forEach((view) => {
      view.onSelect = () => {
        const answer = view.artistId;

        this._onAnswer(answer);
      };
    });
  }

  _addHandlers() {
    this._artistViews.forEach((view) => {
      view.render(this._$container);
    });

    this._audio.render(this._$container);
    this._audio.play();

    this._button.render(this._$container);
    this._button.play();
  }

  _removeHandlers() {
    this._artistViews.forEach((view) => {
      view.unrender();
    });

    this._audio.unrender();
    this._button.unrender();
  }

  _bindHandlers() {}
}
