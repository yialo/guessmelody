import {assert} from 'chai';
import {calculateScore} from './data';

describe('Player score calculator', () => {
  const Answer = function (isGuessed, time) {
    this.isGuessed = isGuessed;
    this.time = time;
  };
  const answers1 = new Array(10).fill(new Answer(true, 32));
  const answersData = [true, true, true, true, true, true, false, true, true, false];
  const answers2 = answersData.map((it) => new Answer(it, 32));

  it('Return -1 if not all questions answered', () => {
    assert.strictEqual(calculateScore(answers2, 3), -1);
    assert.strictEqual(calculateScore(answers2, 2), -1);
    assert.strictEqual(calculateScore(answers2, 1), -1);
  });
  it('Returns final score providing for attempts remain', () => {
    assert.strictEqual(calculateScore(answers1, 3), 10);
    assert.strictEqual(calculateScore(answers1, 2), 8);
    assert.strictEqual(calculateScore(answers1, 1), 6);
  });
});
