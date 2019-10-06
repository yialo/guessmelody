import View from './_view';

export default class ScreenView extends View {
  _kind = String();
  _$ = null;

  constructor(kind) {
    super();

    this._kind = kind;
  }

  get _contentTemplate() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _template() {
    return (
      `<section class="${this._kind}">
        ${this._contentTemplate}
      </section>`
    );
  }

  render() {
    this._$ = ScreenView.createEl(this._template);
    this._addHandlers(this._$);
    ScreenView._$container.appendChild(this._$);
  }

  unrender() {
    this._$.remove();
    this._removeHandlers();
    this._$ = null;
  }

  static _$container = document.querySelector('.main');
}
