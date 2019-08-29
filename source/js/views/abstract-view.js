export default class AbstractView {
  get template() {
    throw new Error(`${this} method must be redefined in AbstractView class' descendant`);
  }

  get $() {
    if (!this._$) {
      this.render();
      this.bind();
    }
    return this._$;
  }

  render() {
    const $container = document.createElement('template');
    $container.innerHTML = this.template;
    this._$ = $container.content.firstChild;
  }

  bind() {
    throw new Error(`${this} method must be redefined in AbstractView class' descendant`);
  }
}
