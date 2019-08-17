import getWelcomeScreen from './screens/welcome';
import questionScreen from './screens/question';
import renderResultScreen from './screens/result';
import { changeScreen } from './lib/utils';

(function init() {
  const welcomeScreen = getWelcomeScreen(() => {
    (function renderGameGenreScreen() {
      const gameGenreScreen = questionScreen.getGenre({
        goBack: init,
        goForward: () => {
          const gameArtistScreen = questionScreen.getArtist({
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
