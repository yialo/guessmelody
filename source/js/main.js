import getWelcomeScreen from './screens/welcome';
import getGameGenreScreen from './screens/game-genre';
import getGameArtistScreen from './screens/game-artist';
import renderResultScreen from './screens/result';
import {changeScreen} from './lib/utils';

(function init() {
  const welcomeScreen = getWelcomeScreen(() => {
    (function renderGameGenreScreen() {
      const gameGenreScreen = getGameGenreScreen({
        goBack: init,
        goForward: () => {
          const gameArtistScreen = getGameArtistScreen({
            goBack: init,
            goForward: () => renderResultScreen(renderGameGenreScreen),
          });
          changeScreen(gameArtistScreen);
        },
      });
      changeScreen(gameGenreScreen);
    }());
  });
  changeScreen(welcomeScreen);
}());
