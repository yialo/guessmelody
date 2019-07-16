import {render, changeScreen} from './util';
import getGameGenreScreen from '../screens/game/genre';

const addButtonHandler = (containerElement) => {
  const button = containerElement.querySelector('.result__replay');
  const gameGenreScreen = getGameGenreScreen();
  button.addEventListener('click', () => changeScreen(gameGenreScreen));
};

export default (templateString) => {
  const container = render(templateString);
  addButtonHandler(container);
  return container;
};
