import AbstractView from '../_Abstract.js';

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
      .map((artist, i) => this._getArtistTemplate(artist, i))
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
