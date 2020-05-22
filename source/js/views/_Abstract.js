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

  _getTemplate() {
    return AbstractView.formatTemplate(this._template);
  }

  _create() {
    const $template = document.createElement('template');
    $template.innerHTML = this._getTemplate();
    this._$content = $template.content;
  }

  _defineChildren() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  _undefineChildren() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  _activate() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  _deactivate() {
    ErrorUtils.claimAbstractMethodDefinition();
  }

  _mount($root) {
    if (!this._$root) {
      this._$root = $root;
    }
    this._$root.append(...this._$content.childNodes);
    this._$content = null;
  }

  _unmount() {
    this._$root.innerHTML = '';
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
