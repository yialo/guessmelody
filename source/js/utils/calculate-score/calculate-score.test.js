import calculateScore from './calculate-score.js';

describe('Player score calculator', () => {
  const Answer = function (isGuessed, time) {
    this.isGuessed = isGuessed;
    this.time = time;
  };
  const getAnswers = (data) => data.map((it) => new Answer(...it));

  const answersData1 = [
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
  ];
  const answersData2 = [
    [true, 29],
    [true, 3],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 12],
  ];
  const answersData3 = [
    [true, 29],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [true, 30],
    [false, 30],
    [true, 30],
    [true, 30],
    [false, 30],
  ];
  const answersData4 = [[true, 30]];

  const answers1 = getAnswers(answersData1);
  const answers2 = getAnswers(answersData2);
  const answers3 = getAnswers(answersData3);
  const answers4 = getAnswers(answersData4);

  it('Return -1 if not all questions answered', () => {
    assert.strictEqual(calculateScore(answers3, 0), -1);
    assert.strictEqual(calculateScore(answers3, 1), -1);
    assert.strictEqual(calculateScore(answers3, 2), -1);
  });
  it('Returns final score providing for mistakes done and all the answers are slow', () => {
    assert.strictEqual(calculateScore(answers1, 0), 10);
    assert.strictEqual(calculateScore(answers1, 1), 8);
    assert.strictEqual(calculateScore(answers1, 2), 6);
    assert.strictEqual(calculateScore(answers4, 0), 1);
  });
  it('Returns final score providing for mistakes done and some answers are quick', () => {
    assert.strictEqual(calculateScore(answers2, 0), 13);
    assert.strictEqual(calculateScore(answers2, 1), 11);
    assert.strictEqual(calculateScore(answers2, 2), 9);
  });
});
