import ErrorUtils from '../utils/errors.js';

/**
 * TODO: TypeScript migration:
 * - define pseudo-private methods
 * - define stubbed methods in interface
 */

export default class AbstractView {
  static formatTemplate(rawTemplate) {
    return rawTemplate.replace(/\n */g, '');
  }

  _$content = null;
  _$root = null;

  constructor() {
    if (new.target === AbstractView) {
      ErrorUtils.restrictAbstractCall();
    }
  }

  get _template() {
    return ErrorUtils.claimAbstractMethodDefinition();
  }

  create() {
    const $template = document.createElement('template');
    $template.innerHTML = this._template;
    this._$content = $template.content;
  }

  defineChildren() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  undefineChildren() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  activate() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  deactivate() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  mount($root) {
    if (!this._$root) {
      this._$root = $root;
    }
    this._$root.append(...this._$content.childNodes);
    this._$content = null;
  }

  unmount() {
    this._$root.innerHTML = '';
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
  }
}
