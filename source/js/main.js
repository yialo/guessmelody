import { initialState } from './data/game-config';
import getRandomScreens from './lib/mock-generator';
import renderWelcomeScreen from './elements/welcome';
import renderQuestionScreen from './elements/question';
import renderResultScreen from './elements/result';

(function init() {
  const gameState = Object.assign({}, initialState);

  const screens = getRandomScreens();
  const userAnswers = [];

  const renderNextScreen = () => {
    const { currentQuestionCount } = gameState;
    const screen = screens[currentQuestionCount];

    renderQuestionScreen(gameState, screen, {
      resetGame: init,
      getNextQuestion: renderNextScreen,
      onSuccess: () => renderResultScreen('success', init),
      onFailure: () => renderResultScreen('failAttempts', renderNextScreen),
    });
  };

  renderWelcomeScreen(() => renderNextScreen());
}());
