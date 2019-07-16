import template from '../../templates/game/artist';
import addBackListener from '../../listeners/game-back';
import {getScreen} from '../../lib/util';

export default (handler) => {
  const {goBack, goNext} = handler;
  const container = getScreen(template);

  addBackListener(container, goBack);

  const radioButtons = container.querySelectorAll('.artist__input');

  radioButtons.forEach((el) => el.addEventListener('click', goNext));

  return container;
};
