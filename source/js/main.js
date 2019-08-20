import { initialState } from './data/game-config';
import { screens } from './data/mocks';
import { changeScreen } from './lib/utils';
import renderWelcomeScreen from './elements/welcome';
import renderQuestionScreen from './elements/question';
import renderResultScreen from './elements/result';

(function init() {
  const gameState = Object.assign({}, initialState);

  const [genreScreen, artistScreen] = screens;
  const userAnswers = [];

  const welcomeScreen = renderWelcomeScreen(() => {
    (function renderGameGenreScreen() {
      const gameGenreScreen = renderQuestionScreen(
        gameState,
        genreScreen,
        {
          goBack: init,
          goForward: () => {
            const gameArtistScreen = renderQuestionScreen(
              gameState,
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
