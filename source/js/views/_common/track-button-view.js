import View from './_view';

export default class TrackButtonView extends View {
  _$ = null;

  _onClick = () => {
    throw new Error('Callback need to be redefined for every instance');
  };

  get template() {
    return `<button class="track__button" type="button"></button>`;
  }

  set onClick(callback) {
    this._onClick = callback;
  }

  set _label(text) {
    this._$.setAttribute('aria-label', text);
  }

  render($container) {
    this._$container = $container;

    this._$ = this._$container.querySelector('.track__button');

    this._addHandlers();
  }

  unrender() {
    this._removeHandlers();

    this._$ = null;
  }

  pause() {
    this._$.classList.remove(`track__button--play`);
    this._$.classList.add(`track__button--pause`);

    this._label = 'Играть трек';
  }

  play() {
    this._$.classList.add(`track__button--play`);
    this._$.classList.remove(`track__button--pause`);

    this._label = 'Поставить на паузу';
  }

  stop() {
    this._$.classList.remove(`track__button--play`);
    this._$.classList.remove(`track__button--pause`);

    this._label = 'Играть трек';
  }

  _onButtonClick() {
    this._onClick();
  }

  _addHandlers() {
    this._$.addEventListener('click', this._onButtonClick);
  }

  _removeHandlers() {
    this._$.removeEventListener('click', this._onButtonClick);
  }

  _bindHandlers() {
    this._onButtonClick = this._onButtonClick.bind(this);
  }
}
