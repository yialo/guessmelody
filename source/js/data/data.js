const FAILURE_CODE = -1;
const ATTEMPTS = 3;
const AnswerCost = {RIGHT: 1, MISTAKE: 2, QUICK: 1};

export function calculateScore(answers, attemptsRemain) {
  if (!answers.every((it) => it.isGuessed)) return FAILURE_CODE;

  const pointsSum = answers
    .map((it) => {
      let score = AnswerCost.RIGHT;
      if (it.time < 30) score += AnswerCost.QUICK;
      return score;
    })
    .reduce((sum, it) => sum + it);

  const mistakesDone = ATTEMPTS - attemptsRemain;

  return pointsSum - AnswerCost.MISTAKE * mistakesDone;
}
