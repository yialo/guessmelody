import {
  claimAbstractMethodDefinition,
  restrictAbstractCall,
} from '@/js/utils/errors.js';

/**
 * TODO: TypeScript migration:
 * - define pseudo-private methods
 */

export default class AbstractView {
  static formatTemplate(rawTemplate) {
    return rawTemplate.replace(/\n */g, '');
  }

  _$children = null;
  _$fragment = null;
  _$root = null;

  constructor() {
    if (new.target === AbstractView) {
      restrictAbstractCall();
    }
  }

  get _template() {
    return claimAbstractMethodDefinition();
  }

  _getTemplate() {
    return AbstractView.formatTemplate(this._template);
  }

  _create() {
    const $template = document.createElement('template');
    $template.innerHTML = this._getTemplate();
    this._$fragment = $template.content;
  }

  _defineChildren() {
    claimAbstractMethodDefinition();
  }

  _undefineChildren() {
    claimAbstractMethodDefinition();
  }

  _activate() {
    claimAbstractMethodDefinition();
  }

  _deactivate() {
    claimAbstractMethodDefinition();
  }

  _mount($root) {
    this._$children = [...this._$fragment.childNodes];
    this._$fragment = null;
    if (!this._$root) {
      this._$root = $root;
    }
    this._$root.append(...this._$children);
  }

  _unmount() {
    this._$children.forEach(($child) => {
      $child.remove();
    });
    this._$children = null;
  }

  _render() {
    claimAbstractMethodDefinition();
  }

  _unrender() {
    claimAbstractMethodDefinition();
  }
}
