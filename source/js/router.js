import GameController from './controllers/game-controller';

export default class Router {
  static startGame() {
    const game = new GameController();
    game.start();
  }
}
