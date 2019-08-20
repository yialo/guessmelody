const FAILURE_CODE = -1;
const ATTEMPTS = 3;
const AnswerPrice = { RIGHT: 1, QUICK: 1, MISTAKE: -2 };

export default (answers, attemptsRemain) => {
  if (!answers.every((it) => it.isGuessed)) return FAILURE_CODE;

  const pointsSum = answers
    .map((it) => {
      let score = AnswerPrice.RIGHT;
      if (it.time < 30) score += AnswerPrice.QUICK;
      return score;
    })
    .reduce((sum, it) => sum + it);

  const mistakesDone = ATTEMPTS - attemptsRemain;

  return pointsSum + AnswerPrice.MISTAKE * mistakesDone;
};
