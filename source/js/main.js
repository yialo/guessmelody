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

  const countAnswer = () => {
    const answer = {
      isGuessed: true,
      time: __MOCK_ANSWER_TIME,
    };

    answers.push(answer);
  };

  const handler = {
    onReset: startNewGame,
    onNextQuestion: (callback) => {
      const previousQuestion = getCurrentQuestion();
      gameState.currentQuestionIndex += 1;
      const newQuestion = getCurrentQuestion();
      callback(newQuestion, previousQuestion);
    },
    onSuccess: () => {
      countAnswer();
      renderResultScreen('success', startNewGame, answers, gameState.mistakes);
    },
    onFailure: () => {
      Object.assign(gameState, INITIAL_STATE);
      answers.length = 0;
      const question = getCurrentQuestion();
      renderResultScreen('failAttempts', () => renderQuestionScreen(gameState, question, handler));
    },
  };

  renderWelcomeScreen(() => {
    const question = getCurrentQuestion();
    renderQuestionScreen(gameState, question, handler);
  });
};

startNewGame();
