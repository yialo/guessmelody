export default class Screen {
  constructor() {
    if (new.target === Screen) {
      throw new Error('Instantiation of this class is restricted');
    }
  }

  show() {
    throw new Error('Method need to be redefined for descendants');
  }

  hide() {
    throw new Error('Method need to be redefined for descendants');
  }
}
