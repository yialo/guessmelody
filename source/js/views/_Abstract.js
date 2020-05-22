import {
  claimAbstractMethodDefinition,
  restrictAbstractCall,
} from '@/js/utils/errors.js';

import {
  activationRender,
  childrenRender,
  activationAndChildrenRender,
} from './_mixins/render.js';

/**
 * TODO: TypeScript migration:
 * - define pseudo-private methods
 */

export default class AbstractView {
  static formatTemplate(rawTemplate) {
    return rawTemplate.replace(/\n */g, '');
  }

  static activationRenderMixin = activationRender;
  static childrenRenderMixin = childrenRender;
  static activationAndChildrenRenderMixin = activationAndChildrenRender;

  _$content = null;
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
    this._$content = $template.content;
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
}
