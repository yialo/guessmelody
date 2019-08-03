import {assert} from 'chai';
import calculateScore from './calculate-score';

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

  const answers1 = getAnswers(answersData1);
  const answers2 = getAnswers(answersData2);
  const answers3 = getAnswers(answersData3);

  it('Return -1 if not all questions answered', () => {
    assert.strictEqual(calculateScore(answers3, 3), -1);
    assert.strictEqual(calculateScore(answers3, 2), -1);
    assert.strictEqual(calculateScore(answers3, 1), -1);
  });
  it('Returns final score providing for attempts remain and all the answers are slow', () => {
    assert.strictEqual(calculateScore(answers1, 3), 10);
    assert.strictEqual(calculateScore(answers1, 2), 8);
    assert.strictEqual(calculateScore(answers1, 1), 6);
  });
  it('Returns final score providing for attempts remain and some answers are quick', () => {
    assert.strictEqual(calculateScore(answers2, 3), 13);
    assert.strictEqual(calculateScore(answers2, 2), 11);
    assert.strictEqual(calculateScore(answers2, 1), 9);
  });
});
