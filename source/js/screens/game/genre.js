import template from '../../templates/game/genre';
import addBackListener from '../../listeners/game-back';
import {getScreen} from '../../lib/util';

export default (handler) => {
  const {goBack, goNext} = handler;
  const container = getScreen(template);

  addBackListener(container, goBack);

  const form = container.querySelector('.game__tracks');
  const checkboxes = [...form.querySelectorAll('.game__input')];
  const submitButton = form.querySelector('.game__submit');

  submitButton.setClickabilityState = function (isClickable) {
    if (isClickable) this.removeAttribute('disabled');
    else this.setAttribute('disabled', 'disabled');
  };
  submitButton.setClickabilityState(false);

  const checkSelectedCheckboxPresence = () => checkboxes.some((el) => el.checked);

  const onCheckboxChange = () => {
    if (checkSelectedCheckboxPresence()) submitButton.setClickabilityState(true);
    else submitButton.setClickabilityState(false);
  };
  checkboxes.forEach((el) => el.addEventListener('change', onCheckboxChange));

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    goNext();
  });

  return container;
};
