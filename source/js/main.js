import { INITIAL_STATE } from './data/game-config';
import { getQuestions as getRandomQuestions } from './lib/mock-generator';

import WelcomeView from './views/welcome-view';
import QuestionView from './views/question-view';

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
    onNext: (callback) => {
      countAnswer();
      const newQuestion = getCurrentQuestion();
      callback(newQuestion);
    },
    onWin: () => {
      countAnswer();
      renderResultScreen('success', startNewGame, answers, gameState.mistakes);
    },
    onFail: () => {
      Object.assign(gameState, INITIAL_STATE);
      answers.length = 0;
      const question = getCurrentQuestion();
      renderResultScreen('failAttempts', () => {
        const questionScreen = new QuestionView(gameState, question, handler);
        questionScreen.render();
      });
    },
  };

  const welcomeScreen = new WelcomeView();
  welcomeScreen.onStart = () => {
    const question = getCurrentQuestion();
    const questionScreen = new QuestionView(gameState, question, handler);
    questionScreen.render();
  };

  welcomeScreen.render();
};

startNewGame();
