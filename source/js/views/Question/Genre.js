import AbstractView from '../_Abstract.js';

export default class QuestonGenreView extends AbstractView {
  _$form = null;
  _$submitButton = null;

  constructor(question) {
    super();
    this._question = question;
  }

  _getTrackTemplate(track, index) {
    const { audioSrc } = track;
    const number = index + 1;
    return (`
      <div class="track">
        <button class="track__button" type="button"></button>
        <div class="track__status">
          <audio loop="loop">
            <source src="${audioSrc}" type="audio/mpeg">
          </audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${number}" id="answer-${number}">
          <label class="game__check" for="answer-${number}" aria-label="Отметить"></label>
        </div>
      </div>
    `);
  }

  get _trackListTemplate() {
    return this._question.trackList
      .map(this._getTrackTemplate)
      .join('');
  }

  get _template() {
    return (`
      <h2 class="game__title">Выберите ${this._question.targetGenre} треки</h2>
      <form class="game__tracks">
        ${this._trackListTemplate}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    `);
  }

  _defineChildren() {
    this._$form = this._$fragment.querySelector('.game__tracks');
    this._$submitButton = this._$fragment.querySelector('.game__submit');
  }

  _undefineChildren() {
    this._$form = null;
    this._$submitButton = null;
  }

  render($root) {
    this._create();
    this._defineChildren();
    this._mount($root);
  }

  unrender() {
    this._unmount();
    this._undefineChildren();
  }
}
