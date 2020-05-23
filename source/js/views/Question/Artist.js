import AbstractView from '../_Abstract.js';

export default class QuestonArtistView extends AbstractView {
  _question = null;
  _$audio = null;
  _$playerButton = null;

  _state = {
    isFirstPlay: true,
  };

  // FIXME: replace corrupted MP3 files
  constructor(question) {
    super();
    this._question = question;

    this._onAudioPlaying = this._onAudioPlaying.bind(this);
    this._onAudioPause = this._onAudioPause.bind(this);
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
        <button class="track__button" type="button" disabled></button>
        <audio loop autoplay>
          <source src="${this._question.trackSrc}" type="audio/mpeg">
        </audio>
      </div>
      <form class="game__artist">
        ${this._artistListTemplate}
      </form>
    `);
  }

  _onAudioPlaying() {
    this._$playerButton.classList.add('track__button--pause');
    this._$playerButton.classList.remove('track__button--play');
    this._$playerButton.disabled = false;
  }

  _onAudioPause() {
    this._$playerButton.classList.remove('track__button--pause');
    this._$playerButton.classList.add('track__button--play');
  }

  _onPlayerButtonClick() {
    if (this._$audio.paused) {
      this._$playerButton.disabled = true;
      this._$audio.play();
    } else {
      this._$audio.pause();
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
    this._$audio.addEventListener('play', this._onAudioPlaying);
    this._$audio.addEventListener('pause', this._onAudioPause);
    this._$playerButton.addEventListener('click', this._onPlayerButtonClick);

    this._$audio.addEventListener('error', (evt) => {
      console.log(evt);
      this._$playerButton.disabled = false;
    });
  }

  _deactivate() {
    this._$audio.removeEventListener('play', this._onAudioPlaying);
    this._$audio.removeEventListener('pause', this._onAudioPause);
    this._$playerButton.removeEventListener('click', this._onPlayerButtonClick);
  }

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
