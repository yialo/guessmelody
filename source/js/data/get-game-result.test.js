import {assert} from 'chai';
import getPlayerResult from './get-game-result';

describe('Game result', () => {
  const Result = function (score, attemptsRemain, timeRemain) {
    this.score = score;
    this.attemptsRemain = attemptsRemain;
    this.timeRemain = timeRemain;
  };

  it('Show defeat: time is off', () => {
    const playerResult1 = new Result(10, 3, 0);

    const otherResults1 = [new Result(8, 1, 150), new Result(9, 2, 250)];
    assert.strictEqual(
        getPlayerResult(playerResult1, otherResults1),
        'Время вышло! Вы не успели отгадать все мелодии.'
    );
  });

  it('Show defeat: attempts are off', () => {
    const playerResult1 = new Result(10, 0, 280);
    const otherResults1 = [new Result(6, 1, 150), new Result(8, 2, 250)];

    assert.strictEqual(
        getPlayerResult(playerResult1, otherResults1),
        'У вас закончились все попытки. Ничего, повезёт в следующий раз!'
    );
  });

  it('Show win results and statistics', () => {
    const playerResult1 = new Result(9, 2, 100);

    const otherResults1 = [new Result(8, 1, 150)];
    assert.strictEqual(
        getPlayerResult(playerResult1, otherResults1),
        'Вы заняли 1 место из 2 игроков. Это лучше, чем у 50% игроков.'
    );

    const otherResults2 = [new Result(12, 1, 150), new Result(7, 2, 250)];
    assert.strictEqual(
        getPlayerResult(playerResult1, otherResults2),
        'Вы заняли 2 место из 3 игроков. Это лучше, чем у 33% игроков.'
    );

    const otherResults3 = [new Result(7, 1, 150), new Result(6, 2, 250), new Result(8, 2, 200)];
    assert.strictEqual(
        getPlayerResult(playerResult1, otherResults3),
        'Вы заняли 1 место из 4 игроков. Это лучше, чем у 75% игроков.'
    );
  });
  it(
      'Show win results and statistics even if there are several players with the same score',
      () => {
        const playerResult1 = new Result(8, 2, 100);

        const otherResults1 = [
          new Result(7, 1, 150),
          new Result(9, 2, 250),
          new Result(6, 3, 120),
          new Result(8, 1, 200),
        ];
        assert.strictEqual(
            getPlayerResult(playerResult1, otherResults1),
            'Вы заняли 2 место из 5 игроков. Это лучше, чем у 40% игроков.'
        );
      }
  );
});
