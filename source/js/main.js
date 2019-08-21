import { INITIAL_STATE } from './data/game-config';
import getRandomQuestions from './lib/mock-generator';
import renderWelcomeScreen from './elements/welcome';
import renderQuestionScreen from './elements/question';
import renderResultScreen from './elements/result';

const __MOCK_ANSWER_TIME = 30;

const startNewGame = () => {
  const questions = getRandomQuestions();
  const gameState = Object.assign({}, INITIAL_STATE);
  const answers = [];

  const getCurrentQuestion = () => questions[gameState.currentQuestionIndex];

  const countAnswer = (answerStatus) => {
    const answer = {
      isGuessed: answerStatus,
      time: __MOCK_ANSWER_TIME,
    };

    answers.push(answer);
  };

  const handlers = {
    resetGame: startNewGame,
    showNextQuestion: () => {},
    onSuccess: () => {
      renderResultScreen('success');
    },
    onFailure: () => {
      renderResultScreen('failAttempts');
    },
  };

  renderWelcomeScreen(() => {
    const question = getCurrentQuestion();
    renderQuestionScreen(gameState, question, handlers);
  });
};

startNewGame();
