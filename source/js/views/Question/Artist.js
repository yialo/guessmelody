import AbstractView from '../_Abstract.js';

export default class QuestonArtistView extends AbstractView {
  _question = null;
  _$audio = null;
  _$playerButton = null;

  constructor(question) {
    super();
    this._question = question;
    this._onPlayerButtonClick = this._onPlayerButtonClick.bind(this);
  }

  _getArtistTemplate(artist, index) {
    const { name, imgSrc } = artist;
    const number = index + 1;
    return (`
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${number}" id="answer-${number}">
        <label class="artist__name" for="answer-${number}">
          <img class="artist__picture" src="${imgSrc}" alt="${name}">
          ${name}
        </label>
      </div>
    `);
  }

  get _artistListTemplate() {
    return this._question.artistList
      .map(this._getArtistTemplate)
      .join('');
  }

  get _template() {
    return (`
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button" type="button"></button>
        <audio loop="loop">
          <source src="${this._question.trackSrc}" type="audio/mpeg">
        </audio>
      </div>
      <form class="game__artist">
        ${this._artistListTemplate}
      </form>
    `);
  }

  _onPlayerButtonClick() {
    if (this._$audio.paused) {
      const playPromise = this._$audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Playback started!');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      this._$audio.pause();
    }
  }

  _playAudio() {
    const playPromise = this._$audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Playback started!');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _defineChildren() {
    this._$audio = this._$fragment.querySelector('.game__track audio');
    this._$playerButton = this._$fragment.querySelector('.track__button');
  }

  _undefineChildren() {
    this._$audio = null;
    this._$playerButton = null;
  }

  _activate() {
    this._$playerButton.addEventListener('click', this._onPlayerButtonClick);
  }

  _deactivate() {
    this._$playerButton.removeEventListener('click', this._onPlayerButtonClick);
  }

  // TODO: add audio autoplay
  render($root) {
    this._create();
    this._defineChildren();
    this._activate();
    this._mount($root);
  }

  unrender() {
    this._unmount();
    this._deactivate();
    this._undefineChildren();
  }
}
