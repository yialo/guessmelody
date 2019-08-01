const Coords = function (x, y) {
  this.x = x;
  this.y = y;
};

export const findStartCoords = (maze) => {
  for (let i = 0; i < maze.length; i++) {
    const mazeRow = maze[i];
    for (let j = 0; j < mazeRow.length; j++) {
      if (mazeRow[j] === 2) {
        return new Coords(j + 1, i + 1);
      }
    }
  }
  return -1;
};

export const checkPoint = (maze, coords) => {
  const Size = {
    ROWS: maze.length,
    COLUMNS: maze[0].length,
  };

  if (
    coords.x > Size.COLUMNS
    || coords.y > Size.ROWS
    || coords.x < 0
    || coords.y < 0
  ) return -1;

  const currentValue = maze[coords.y - 1][coords.x - 1];

  if (currentValue === 0) return 0;
  if (currentValue === 3) return 1;
  if (currentValue === 1) return -1;

  return -1;
};

export default (maze) => {
  const Size = {
    ROWS: maze.length,
    COLUMNS: maze[0].length,
  };

  const start = findStartCoords(maze);

  if (start === -1) return 'There is no enter point!';

  const wayStack = [start];


  return wayStack;
};
