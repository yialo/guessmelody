import getGameGenreScreen from '../screens/game-genre';
import {render, changeScreen} from './util';

const addButtonHandler = (containerElement) => {
  const button = containerElement.querySelector('.result__replay');
  const gameGenreScreen = getGameGenreScreen();
  button.addEventListener('click', () => changeScreen(gameGenreScreen));
};

export const getResultsScreen = (templateString) => {
  const container = render(templateString);
  addButtonHandler(container);
  return container;
};

export default addButtonHandler;
