import ErrorUtils from '../utils/errors.js';

export default class AbstractView {
  $ = null;
  _$root = null;

  constructor() {
    if (new.target === AbstractView) {
      ErrorUtils.restrictAbstractCall();
    }
  }

  _getTemplate() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  render($root) {
    this.create();
    if (typeof this.defineChildren === 'function') {
      this.defineChildren();
    }
    if (typeof this.activate === 'function') {
      this.activate();
    }
    this.mount($root);
  }

  unrender() {
    this.unmount();
    if (typeof this.deactivate === 'function') {
      this.deactivate();
    }
    if (typeof this.undefineChildren === 'function') {
      this.undefineChildren();
    }
    this.destroy();
  }

  create() {
    this.$ = document.createElement('template');
    this.$.innerHTML = this._getTemplate().trim();
  }

  destroy() {
    this.$ = null;
  }

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
}
