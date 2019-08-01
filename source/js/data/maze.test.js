import {assert} from 'chai';
import findWay from './maze';

describe('Test function for traverse through maze', () => {
  it('Returns an array of coordinates', () => {
    const maze1 = [
      [2, 0, 3],
      [1, 1, 1],
    ];
    const expectedWay = [[1, 1], [2, 1], [3, 1]];

    assert.deepEqual(findWay(maze1), expectedWay);
  });
});
