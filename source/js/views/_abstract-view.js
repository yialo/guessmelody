import errorUtil from '../utils/errors';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      errorUtil.restrictAbstractCall();
    }

    this._$ = null;
    this._$root = null;

    this._bind();
  }

  get $() {
    return this._$.content;
  }

  get _template() {
    return `<div>It is a generic element without any sensible purpose</div>`;
  }

  render($root) {
    this.createElement();
    this.defineChildren();
    this.activate();
    this.mount($root);
  }

  unrender() {
    this.unmount();
    this.deactivate();
    this.undefineChildren();
    this.destroyElement();
  }

  createElement() {
    this._$ = document.createElement('template');
    this._$.innerHTML = this._template.trim();
  }

  destroyElement() {
    this._$ = null;
  }

  defineChildren() {}

  undefineChildren() {}

  activate() {}

  deactivate() {}

  mount($root) {
    if (!this._$root) {
      this._$root = $root;
    }

    const $children = [...this.$.childNodes];
    $children.forEach(($child) => {
      this._$root.appendChild($child);
    });
  }

  unmount() {
    const $children = [...this._$root.childNodes];

    [...this._$root.childNodes].forEach(($child) => {
      $child.remove();
    });
    $children.fill(null);
  }

  update() {}

  _bind() {}
}
