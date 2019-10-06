import GameController from './controllers/game-controller';

// TODO: for next MVC improvement

export default class Router {
  static startGame() {
    const game = new GameController();
    game.start();
  }

  // static showWelcome() {
  //   const welcome = new WelcomeScreen(new WelcomeModel());
  //   changeScreen(welcome);
  // }

  // static showGame(state) {
  //   const game = new GameScreen(new QuestionModel(state));
  //   changeScreen(game);
  //   game.start();
  // }

  // static showResult(model) {
  //   const result = new ResultScreen(model);
  //   changeScreen(result);
  // }
}
