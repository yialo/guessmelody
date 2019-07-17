import template from '../templates/welcome';
import {getScreen} from '../lib/utils';

export default function (buttonClickHandler) {
  const container = getScreen(template);
  const playButton = container.querySelector('.welcome__button');
  playButton.addEventListener('click', buttonClickHandler);
  return container;
}
