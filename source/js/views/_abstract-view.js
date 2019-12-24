// const { restrictConstructorCall, requireMethodRedefinition } = throwError;

// export default class AbstractView {
//   constructor(props = {}) {
//     if (new.target === AbstractView) {
//       restrictConstructorCall();
//     }

//     this._props = props;

//     this._setHandlerNames();
//     this._bindHandlers();
//   }

//   set $root($rootElement) {
//     if (!this._$root) {
//       this._$root = $rootElement;
//     }
//   }

//   get template() {
//     return requireMethodRedefinition();
//   }

//   get _isSingle() {
//     return Boolean(this._$);
//   }

//   create($root) {
//     this.createContainer();
//     this.defineElements();
//     this.activate();
//     this.mount($root);
//     this.performAfterMount();
//   }

//   destroy() {
//     this.performBeforeUnmount();
//     this.unmount();
//     this.deactivate();
//     this.undefineElements();
//   }

//   createContainer() {
//     if (!this._$container) {
//       this._$container = document.createElement('div');
//     }
//   }

//   defineRoot($root) {
//     if (!this._$root) {
//       this._$root = $root;
//     }
//   }

//   defineElements() {
//     this._$container.innerHTML = this.template.trim();

//     this._$children = [...this._$container.childNodes];
//     const $firstChild = this._$children[0];

//     if (this._$children.length === 1 && $firstChild.nodeType === 1) {
//       this._$ = $firstChild;
//     }
//   }

//   undefineElements() {
//     if (this._$) {
//       this._$ = null;
//     }

//     this._$children = null;
//   }

//   activate() {}

//   deactivate() {}

//   mount($root) {
//     this.defineRoot($root);

//     this._$children.forEach(($child) => {
//       this._$root.appendChild($child);
//     });
//   }

//   unmount() {
//     this._$.remove();
//   }

//   performAfterMount() {}

//   performBeforeUnmount() {}

//   update() {}

//   _setHandlerNames() {
//     const nameArg = this._props.handlerNames;

//     if (!nameArg) {
//       this._handlerNames = null;
//     } else if (typeof nameArg === 'string') {
//       this._handlerNames = [nameArg];
//     } else if (Array.isArray(nameArg)) {
//       this._handlerNames = nameArg;
//     } else {
//       throw new Error(`Unexpected type of 'nameArg'`);
//     }
//   }

//   _bindHandlers() {
//     if (this._handlerNames) {
//       this._handlerNames.forEach((name) => {
//         this[`_${name}`] = this[`_${name}`].bind(this);
//       });
//     }
//   }
// }

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
