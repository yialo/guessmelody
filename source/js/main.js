import { screens } from './data/data';
import { changeScreen } from './lib/utils';
import renderWelcomeScreen from './elements/welcome';
import renderQuestionScreen from './elements/question';
import renderResultScreen from './elements/result';

const [genreScreen, artistScreen] = screens;

(function init() {
  const welcomeScreen = renderWelcomeScreen(() => {
    (function renderGameGenreScreen() {
      const gameGenreScreen = renderQuestionScreen(
        genreScreen,
        {
          goBack: init,
          goForward: () => {
            const gameArtistScreen = renderQuestionScreen(
              artistScreen,
              {
                goBack: init,
                goForward: () => renderResultScreen(renderGameGenreScreen),
              }
            );
            changeScreen(gameArtistScreen);
          },
        }
      );
      changeScreen(gameGenreScreen);
    }());
  });
  changeScreen(welcomeScreen);
}());
