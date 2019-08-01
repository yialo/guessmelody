import {assert} from 'chai';
import findWayFromMaze, {findStartCoords, checkPoint} from './maze';

describe('Test function for finding maze start point', () => {
  it('Returns an object with enter-point coordinates', () => {
    const maze1 = [
      [2, 0, 3],
    ];
    const coordsExpected1 = {x: 1, y: 1};

    const maze2 = [
      [0, 0, 1],
      [0, 0, 2],
    ];
    const coordsExpected2 = {x: 3, y: 2};

    const maze3 = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 3, 0],
    ];
    const coordsExpected3 = -1;

    assert.deepEqual(findStartCoords(maze1), coordsExpected1);
    assert.deepEqual(findStartCoords(maze2), coordsExpected2);
    assert.deepEqual(findStartCoords(maze3), coordsExpected3);
  });
});

describe('Test function that checks coords for accessibility', () => {
  const maze = [
    [2, 0, 3],
    [0, 1, 0],
  ];

  it('Returns -1 if choosed direction is beyond the maze', () => {
    const coords1 = {x: 1, y: 3};
    const expected1 = -1;
    assert.strictEqual(checkPoint(maze, coords1), expected1);

    const coords2 = {x: 4, y: 2};
    const expected2 = -1;
    assert.strictEqual(checkPoint(maze, coords2), expected2);

    const coords3 = {x: -1, y: 0};
    const expected3 = -1;
    assert.strictEqual(checkPoint(maze, coords3), expected3);
  });

  it('Returns -1 if choosed point contains the wall', () => {
    const coords1 = {x: 2, y: 2};
    const expected1 = -1;
    assert.strictEqual(checkPoint(maze, coords1), expected1);
  });

  it('Returns 0 if choosed direction is possible', () => {
    const coords1 = {x: 2, y: 1};
    const expected1 = 0;
    assert.strictEqual(checkPoint(maze, coords1), expected1);

    const coords2 = {x: 1, y: 2};
    const expected2 = 0;
    assert.strictEqual(checkPoint(maze, coords2), expected2);
  });

  it('Returns 1 if choosed direction leads to exit', () => {
    const coords1 = {x: 3, y: 1};
    const expected1 = 1;
    assert.strictEqual(checkPoint(maze, coords1), expected1);
  });
});

/*
describe('Test function for traverse through maze', () => {
  it('Returns an array of coordinates', () => {
    const maze1 = [
      [2, 0, 3],
    ];
    const wayExpected = [[1, 1], [2, 1], [3, 1]];

    assert.deepEqual(findWayFromMaze(maze1), wayExpected);
  });
});
*/
