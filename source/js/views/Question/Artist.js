import AbstractView from '../_Abstract.js';
// import AudioTrackView from '../_common/audio-track-view.js';
// import ArtistView from '../_common/artist-view.js';

export default class QuestonArtistView extends AbstractView {
  _question = null;
  _$track = null;
  _$artist = null;
  _state = {
    audio: 'stop',
  };

  constructor(question) {
    super();
    this._question = question;
  }

  get _template() {
    return (`
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button" type="button"></button>
        <audio loop="loop">
          <source src="${process.env.PUBLIC_PATH}files/audio/firefly.mp3" type="audio/mpeg">
        </audio>
      </div>
      <form class="game__artist">
        {this._formTemplate}
      </form>
    `);
  }

  _defineChildren() {
    this._$track = this._$fragment.querySelector('.game__track');
    this._$artist = this._$fragment.querySelector('.game__artist');
  }

  _undefineChildren() {
    this._$track = null;
    this._$artist = null;
  }

  render($root) {
    this._create();
    this._mount($root);
  }

  unrender() {
    this._unmount();
  }
}
