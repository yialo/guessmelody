import getWelcomeScreen from './screens/welcome';
import getQuestionScreen from './screens/question';
import getResultScreen from './screens/result';
import { changeScreen } from './lib/utils';

(function init() {
  const welcomeScreen = getWelcomeScreen(() => {
    (function getGameGenreScreen() {
      const gameGenreScreen = getQuestionScreen('genre', {
        goBack: init,
        goForward: () => {
          const gameArtistScreen = getQuestionScreen('artist', {
            goBack: init,
            goForward: () => getResultScreen(getGameGenreScreen),
          });
          changeScreen(gameArtistScreen);
        },
      });
      changeScreen(gameGenreScreen);
    }());
  });
  changeScreen(welcomeScreen);
}());
