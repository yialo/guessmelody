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

  _create() {
    this._$ = ScreenView.createEl(this._template);
  }

  _destroy() {
    this._$ = null;
  }

  _append() {
    ScreenView._$container.appendChild(this._$);
  }

  _remove() {
    this._$.remove();
  }

  static _$container = document.querySelector('.main');
}
