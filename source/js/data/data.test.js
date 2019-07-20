import {assert} from 'chai';
import {calculateScore} from './data';

describe('Player score calculator', () => {
  describe('Check array of answered questions', () => {
    it('Return sum points for every answer', () => {
      const Answer = function (isGuessed, time) {
        this.isGuessed = isGuessed;
        this.time = time;
      };
      const answers1 = new Array(10).fill(new Answer(true, 32));
      const answersData = [true, true, true, true, true, true, false, true, true, false];
      const answers2 = answersData.map((it) => new Answer(it, 32));

      assert.deepEqual(calculateScore(answers1), 10);
      assert.deepEqual(calculateScore(answers2), -1);
    });
  });
});

// const attemptsRemain = 1;
