import { INITIAL_STATE } from './data/game-config';
import getRandomQuestions from './lib/mock-generator';
import renderWelcomeScreen from './elements/welcome';
import renderQuestionScreen from './elements/question';
import renderResultScreen from './elements/result';

const __MOCK_ANSWER_TIME = 30;

const init = () => {
  const gameState = Object.assign({}, INITIAL_STATE);

  const questions = getRandomQuestions();
  const userAnswers = [];

  const addAnswerData = (answerStatus) => {
    const answer = {
      isGuessed: answerStatus,
      time: __MOCK_ANSWER_TIME,
    };

    userAnswers.push(answer);
  };

  const renderNextQuestionView = () => {
    const { currentQuestionCount } = gameState;
    const screen = questions[currentQuestionCount];

    renderQuestionScreen(gameState, screen, {
      resetGame: init,
      getNextQuestion: (answerStatus) => {
        addAnswerData(answerStatus);
        renderNextQuestionView();
      },
      onSuccess: (answerStatus) => {
        addAnswerData(answerStatus);
        renderResultScreen('success', init, userAnswers, gameState.mistakes);
      },
      onFailure: () => renderResultScreen('failAttempts', renderNextQuestionView),
    });
  };

  renderWelcomeScreen(() => renderNextQuestionView());
};

init();
