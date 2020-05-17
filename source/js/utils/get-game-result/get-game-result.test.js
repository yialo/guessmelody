import getPlayerResult from './get-game-result.js';

describe('Game result', () => {
  const Result = function (score, mistakesDone, timeRemain) {
    this.score = score;
    this.mistakesDone = mistakesDone;
    this.timeRemain = timeRemain;
  };

  it('Show defeat: time is off', () => {
    const playerResult1 = new Result(10, 0, 0);

    const otherResults1 = [new Result(8, 2, 150), new Result(9, 1, 250)];
    assert.strictEqual(
      getPlayerResult(playerResult1, otherResults1),
      'Время вышло! Вы не успели отгадать все мелодии.'
    );
  });

  it('Show defeat: attempts are off', () => {
    const playerResult1 = new Result(10, 3, 280);
    const otherResults1 = [new Result(6, 2, 150), new Result(8, 1, 250)];

    assert.strictEqual(
      getPlayerResult(playerResult1, otherResults1),
      'У вас закончились все попытки. Ничего, повезёт в следующий раз!'
    );
  });

  it('Show win results and statistics', () => {
    const playerResult1 = new Result(9, 1, 100);

    const otherResults1 = [new Result(8, 2, 150)];
    assert.strictEqual(
      getPlayerResult(playerResult1, otherResults1),
      'Вы заняли 1 место из 2 игроков. Это лучше, чем у 50% игроков.'
    );

    const otherResults2 = [new Result(12, 2, 150), new Result(7, 1, 250)];
    assert.strictEqual(
      getPlayerResult(playerResult1, otherResults2),
      'Вы заняли 2 место из 3 игроков. Это лучше, чем у 33% игроков.'
    );

    const otherResults3 = [new Result(7, 2, 150), new Result(6, 1, 250), new Result(8, 1, 200)];
    assert.strictEqual(
      getPlayerResult(playerResult1, otherResults3),
      'Вы заняли 1 место из 4 игроков. Это лучше, чем у 75% игроков.'
    );
  });
  it(
    'Show win results and statistics even if there are several players with the same score',
    () => {
      const playerResult1 = new Result(8, 1, 100);

      const otherResults1 = [
        new Result(7, 2, 150),
        new Result(9, 1, 250),
        new Result(6, 0, 120),
        new Result(8, 2, 200),
      ];
      assert.strictEqual(
        getPlayerResult(playerResult1, otherResults1),
        'Вы заняли 2 место из 5 игроков. Это лучше, чем у 40% игроков.'
      );
    }
  );
});
