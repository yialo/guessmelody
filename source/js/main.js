import GameModel from './models/game-model';

import WelcomeView from './views/welcome-view';
import QuestionView from './views/question-view';

import renderResultScreen from './elements/result';

const startNewGame = () => {
  const gameModel = new GameModel();

  const handler = {
    onReset: startNewGame,
    onNext: (callback) => {
      gameModel.countAnswer();
      const newQuestion = gameModel.currentQuestion;
      callback(newQuestion);
    },
    onWin: () => {
      gameModel.countAnswer();
      renderResultScreen('success', startNewGame, gameModel.answers, gameModel.state.mistakes);
    },
    onFail: () => {
      gameModel.resetState();
      gameModel.resetAnswers();
      const question = gameModel.currentQuestion;
      renderResultScreen('failAttempts', () => {
        const questionScreen = new QuestionView(gameModel.state, question, handler);
        questionScreen.render();
      });
    },
  };

  const welcomeScreen = new WelcomeView();
  welcomeScreen.onStart = () => {
    const question = gameModel.currentQuestion;
    const questionScreen = new QuestionView(gameModel.state, question, handler);
    questionScreen.render();
  };

  welcomeScreen.render();
};

startNewGame();
