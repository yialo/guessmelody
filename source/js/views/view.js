export default class View {
  constructor() {
    if (new.target === View) throw new Error(`Only one's descendants can be invoked`);
  }

  get template() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get $() {
    if (!this._$) {
      this._createEl();
    }

    return this._$;
  }

  _bind() {
    console.log(this);
  }

  _unbind() {
    console.log(this);
  }

  _createEl() {
    this._$ = View.createEl(this.template);
  }

  static createEl(template) {
    const $container = document.createElement('template');
    $container.innerHTML = template;
    return $container.content.firstChild;
  }
}
