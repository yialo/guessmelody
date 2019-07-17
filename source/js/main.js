import getWelcomeScreen from './screens/welcome';
import getGameGenreScreen from './screens/game/genre';
import getGameArtistScreen from './screens/game/artist';
import renderResultScreen, {changeScreen} from './screens/result';

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
