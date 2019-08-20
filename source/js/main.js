import { INITIAL_STATE } from './data/game-config';
import getRandomScreens from './lib/mock-generator';
import renderWelcomeScreen from './elements/welcome';
import renderQuestionScreen from './elements/question';
import renderResultScreen from './elements/result';

const __MOCK_ANSWER_TIME = 30;

(function init() {
  const gameState = Object.assign({}, INITIAL_STATE);

  const screens = getRandomScreens();
  const userAnswers = [];

  const addAnswerData = (answerStatus) => {
    const answer = {
      isGuessed: answerStatus,
      time: __MOCK_ANSWER_TIME,
    };

    userAnswers.push(answer);
  };

  const renderNextScreen = () => {
    const { currentQuestionCount } = gameState;
    const screen = screens[currentQuestionCount];

    renderQuestionScreen(gameState, screen, {
      resetGame: init,
      getNextQuestion: (answerStatus) => {
        addAnswerData(answerStatus);
        renderNextScreen();
      },
      onSuccess: (answerStatus) => {
        addAnswerData(answerStatus);
        renderResultScreen('success', init, userAnswers, gameState.mistakes);
      },
      onFailure: () => renderResultScreen('failAttempts', renderNextScreen),
    });
  };

  renderWelcomeScreen(() => renderNextScreen());
}());
