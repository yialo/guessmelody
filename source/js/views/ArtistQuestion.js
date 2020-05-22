import AbstractView from '../_abstract-view.js';
import AudioTrackView from '../_common/audio-track-view.js';
import ArtistView from '../_common/artist-view.js';

export default class QuestonArtistView extends AbstractView {
  constructor(question) {
    super();

    // TODO: is next statement necessary?
    this._question = question;

    this._artistList = question.trackList;
    this._targetTrack = question.targetTrack;
    this._correctAnswer = question.correctAnswer;

    this._audioTrack = new AudioTrackView(this._targetTrack);

    this._createArtistViews();
    this._addAtristViewHandlers();
  }

  get _template() {
    return (
      `<div class="game__screen">
        <h2 class="game__title">Кто исполняет эту песню?</h2>
        <div class="game__track">
          ${this._audioTrack.buttonTemplate}
          ${this._audioTrack.audioTemplate}
        </div>
        <form class="game__artist">
          ${this._formTemplate}
        </form>
      </div>`
    );
  }

  get _formTemplate() {
    return this._artistViews
      .map((view) => view.template)
      .join('');
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

    this._audioTrack.render(this._$container);
    this._audioTrack.play();
  }

  _removeHandlers() {
    this._artistViews.forEach((view) => {
      view.unrender();
    });

    this._audioTrack.unrender();
  }
}
