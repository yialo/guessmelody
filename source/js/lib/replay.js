import getGameGenreScreen from '../screens/game-genre';
import {changeScreen} from './util';

const addButtonHandler = (containerElement) => {
  const button = containerElement.querySelector('.result__replay');
  const gameGenreScreen = getGameGenreScreen();
  button.addEventListener('click', () => changeScreen(gameGenreScreen));
};

export default addButtonHandler;
