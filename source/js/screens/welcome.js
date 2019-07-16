import template from '../templates/welcome';
import {getScreen} from '../lib/util';

export default (buttonClickHandler) => {
  const container = getScreen(template);
  const playButton = container.querySelector('.welcome__button');
  playButton.addEventListener('click', buttonClickHandler);
  return container;
};
