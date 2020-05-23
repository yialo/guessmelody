import AbstractView from '../_Abstract.js';
// import AudioTrackView from '../_common/audio-track-view.js';
// import ArtistView from '../_common/artist-view.js';

export default class QuestonArtistView extends AbstractView {
  constructor(question) {
    super();
    this._question = question;
  }

  get _template() {
    return (`
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        {this._audioTrack.buttonTemplate}
        {this._audioTrack.audioTemplate}
      </div>
      <form class="game__artist">
        {this._formTemplate}
      </form>
    `);
  }

  render($root) {
    this._create();
    this._mount($root);
  }

  unrender() {
    this._unmount();
  }
}
