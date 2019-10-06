export default class View {
  constructor() {
    if (new.target === View) {
      throw new Error('Instantiation of this class is restricted');
    }
  }

  render() {
    throw new Error('Method need to be redefined for descendants');
  }

  unrender() {
    throw new Error('Method need to be redefined for descendants');
  }

  static createEl(template) {
    const $container = document.createElement('template');
    $container.innerHTML = template;
    return $container.content.firstChild;
  }
}
