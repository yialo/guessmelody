import template from '../../templates/game/artist';
import {getScreen, addBackLinkClickHandler} from '../../lib/utils';

export default (handler) => {
  const {goBack, goForward} = handler;
  const container = getScreen(template);

  addBackLinkClickHandler(container, goBack);

  const radioButtons = container.querySelectorAll('.artist__input');

  radioButtons.forEach((el) => el.addEventListener('click', goForward));

  return container;
};
