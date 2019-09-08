import GameController from './controllers/game-controller';

export default class Router {
  static startGame() {
    const game = new GameController();
    game.start();
  }

  // TODO: for next MVC improvement
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
