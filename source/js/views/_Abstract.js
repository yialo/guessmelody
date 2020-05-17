import ErrorUtils from '../utils/errors.js';

// TODO: define pseudo-private methods to simplify next TypeScript migration

export default class AbstractView {
  _$ = null;
  _$root = null;

  constructor() {
    if (new.target === AbstractView) {
      ErrorUtils.restrictAbstractCall();
    }
  }

  get _template() {
    return ErrorUtils.claimAbstractMethodDefinition();
  }

  get $() {
    return this._$.content;
  }

  create() {
    this._$ = document.createElement('template');
    this._$.innerHTML = this._template;
  }

  destroy() {
    this._$ = null;
  }

  defineChildren() {
    return ErrorUtils.claimAbstractMethodDefinition();
  }

  undefineChildren() {
    return ErrorUtils.claimAbstractMethodDefinition();
  }

  mount($root) {
    if (!this._$root) {
      this._$root = $root;
    }
    this._$root.append(...this.$.childNodes);
  }

  unmount() {
    [...this._$root.childNodes].forEach(($child) => {
      $child.remove();
    });
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
}
