export function calculateScore(answers) {
  const points = answers.map((answer) => {
    if (answer.isGuessed) return 1;
    return 0;
  });

  const pointsSum = points.reduce((sum, it) => sum + it);

  if (pointsSum < 10) return -1;

  return pointsSum;
}
