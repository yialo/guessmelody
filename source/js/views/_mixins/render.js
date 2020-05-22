import { claimAbstractMethodDefinition } from '@/js/utils/errors.js';

const children = {
  _defineChildren() {
    claimAbstractMethodDefinition();
  },
  _undefineChildren() {
    claimAbstractMethodDefinition();
  },
};

const activation = {
  _activate() {
    claimAbstractMethodDefinition();
  },
  _deactivate() {
    claimAbstractMethodDefinition();
  },
};

export const activationRender = {
  ...activation,
  render($root) {
    this._create();
    this._activate();
    this._mount($root);
  },
  unrender() {
    this._unmount();
    this._deactivate();
  },
};

export const childrenRender = {
  ...children,
  render($root) {
    this._create();
    this._defineChildren();
    this._mount($root);
  },
  unrender() {
    this._unmount();
    this._undefineChildren();
  },
};

export const activationAndChildrenRender = {
  ...activation,
  ...children,
  render($root) {
    this._create();
    this._defineChildren();
    this._activate();
    this._mount($root);
  },
  unrender() {
    this._unmount();
    this._deactivate();
    this._undefineChildren();
  },
};
