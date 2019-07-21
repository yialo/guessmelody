const FAILURE_CODE = -1;
const ATTEMPTS = 3;
const AnswerCost = {RIGHT: 1, MISTAKE: 2};

export function calculateScore(answers, attemptsRemain) {
  const pointsSum = answers
    .map((answer) => {
      if (answer.isGuessed) return AnswerCost.RIGHT;
      return 0;
    })
    .reduce((sum, it) => sum + it);

  if (pointsSum < 10) return FAILURE_CODE;

  const mistakesDone = ATTEMPTS - attemptsRemain;

  return pointsSum - AnswerCost.MISTAKE * mistakesDone;
}
